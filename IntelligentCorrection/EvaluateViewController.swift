//
//  EvaluateViewController.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/27.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit
import SnapKit
import Alamofire
import Toast_Swift
import MBProgressHUD

class EvaluateViewController: UIViewController,UITableViewDelegate,UITableViewDataSource {
    
    
    var articleTitle = "";
    var articleContent = "";
    var gradeID = 3;
    var editCount = 3;
    
    fileprivate var score:Int = 0;                      //分数
    fileprivate var evaluationString = "";              //评价
    fileprivate var characterCount:Int = 0;             //字数
    fileprivate var enhances:NSArray?;                      //拓展建议
    fileprivate var paragraphMarkEntityList:NSArray?;                      //段落详解
    fileprivate var paragraphRemarkEntityList:NSArray?;                      //段落点评
    fileprivate var suggestions:NSArray?;                      //建议
    
    fileprivate var _tableView:UITableView!;
    fileprivate var tableView:UITableView {
        get {
            guard _tableView == nil else {
                return _tableView;
            }
            
            _tableView = UITableView.init();
            _tableView.delegate = self;
            _tableView.dataSource = self;
            _tableView.backgroundColor = .clear;
            
            return _tableView;
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.title = "批改结果";
        self.view.backgroundColor = UIColor.white;
        
        self.view.addSubview(self.tableView);
        self.tableView.snp.makeConstraints { (make) in
            if #available(iOS 11.0, *) {
                make.edges.equalTo(self.view.safeAreaInsets)
            } else {
                // Fallback on earlier versions
                make.edges.equalTo(self.view);
            };
        }
        
        self.evaluateArticle();
    }
    
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated);
    }
    
    func evaluateArticle() -> Void {
        var dict = [String:String]();
        dict["Accept"] = "*/*"
        dict["Accept-Encoding"] = "gzip, deflate, br"
        dict["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
        
        let para = [
            "title": self.articleTitle,
            "content": self.articleContent,
            "gradeId": self.gradeID,
            "editCount": self.editCount
            ] as [String : Any];
        
        MBProgressHUD.showAdded(to: self.view, animated: true);
        //登录
        Alamofire.request("https://www.znpigai.com/compositionActionv6_experience", method: .post, parameters: para, headers: dict).responseString { (response) in
            MBProgressHUD.hide(for: self.view, animated: true);
            switch(response.result) {
            case .success( _):
                if var jsonString = response.result.value {
                    jsonString = jsonString.replacingOccurrences(of: "\\\\\\", with: "\\")
                    let data = jsonString.data(using: .utf8)!
                    do {
                        if let jsonArray = try JSONSerialization.jsonObject(with: data, options : .mutableContainers) as? NSDictionary
                        {
                            print(jsonArray) // use the json here
                            if let evaluationScoreHistoryList = jsonArray["evaluationScoreHistoryList"] as? NSArray,evaluationScoreHistoryList.count > 0 {
                                if let dic = evaluationScoreHistoryList[0] as? NSDictionary {
                                    self.score = (dic["score"] as? NSNumber)?.intValue ?? 0;
                                }
                            }
                            if let evaluation = jsonArray["evaluation"] as? NSDictionary {
                                if let summaryReportEvaluationResult = evaluation["summaryReportEvaluationResult"] as? NSDictionary {
                                    if let characterCountTemp = summaryReportEvaluationResult["characterCount"] as? NSNumber {
                                        self.characterCount = characterCountTemp.intValue;
                                    }
                                }
                                if let remark = evaluation["remark"] as? String {
                                    self.evaluationString = remark;
                                }
                                if let enhancesTemp = evaluation["enhances"] as? NSArray {
                                    self.enhances = enhancesTemp;
                                }
                                if let paragraphMarkEntityList = evaluation["paragraphMarkEntityList"] as? NSArray {
                                    self.paragraphMarkEntityList = paragraphMarkEntityList;
                                }
                                if let suggestions = evaluation["suggestions"] as? NSArray {
                                    self.suggestions = suggestions;
                                }
                                if let paragraphRemarkEntityList = evaluation["paragraphRemarkEntityList"] as? NSArray {
                                    self.paragraphRemarkEntityList = paragraphRemarkEntityList;
                                }
                            }
                            self.tableView.reloadData();
                        } else {
                            print("bad json")
                        }
                    } catch let error as NSError {
                        print(error)
                    }
                    //let evaluation = json["evaluation"] as? NSDictionary;
                }
                break;
            case .failure(_):
                self.view.makeToast("批改失败，请重试！")
                break;
            }
        }
    }
    
    // MARK: -UITableViewDelegate
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if (section == 0)
        {
            return 1;
        }
        else if (section == 1)
        {
            return 1;
        }
        else
        {
            return 3;
        }
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 3;
    }
    
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let view = UIView.init();
        view.backgroundColor = UIColor.init(red: 245.0/255.0, green: 245.0/255.0, blue: 245.0/255.0, alpha: 1);
        let label = UILabel.init();
        label.textColor = UIColor.init(red: 142.0/255.0, green: 142.0/255.0, blue: 142.0/255.0, alpha: 1);
        label.backgroundColor = .clear;
        label.textAlignment = .left;
        label.font = UIFont.systemFont(ofSize: 18);
        view.addSubview(label);
        label.snp.makeConstraints { (make) in
            make.left.equalTo(view).offset(15);
            make.top.right.bottom.equalTo(view);
        }
        if (section == 0)
        {
            label.text = "评分";
        }
        else if (section == 1)
        {
            label.text = "总评";
        }
        else
        {
            label.text = "作文点评";
            let labelCount = UILabel.init();
            labelCount.text = String.init(format: "字数:%d", self.characterCount);
            labelCount.textColor = UIColor.init(red: 142.0/255.0, green: 142.0/255.0, blue: 142.0/255.0, alpha: 1);
            labelCount.backgroundColor = .clear;
            labelCount.textAlignment = .right;
            labelCount.font = UIFont.systemFont(ofSize: 14);
            label.addSubview(labelCount);
            labelCount.snp.makeConstraints { (make) in
                make.top.bottom.equalTo(label);
                make.right.equalTo(label).offset(-20);
                make.width.equalTo(100);
            }
            
        }
        return view;
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if (indexPath.section == 0)
        {
            return 50;
        }
        else if (indexPath.section == 1)
        {
            return 150;
        }
        else
        {
            return 44;
        }
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 30;
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if (indexPath.section == 0)
        {
            var cell:UITableViewCell? = tableView.dequeueReusableCell(withIdentifier: "scorecell");
            if cell == nil {
                cell = UITableViewCell.init(style: .default, reuseIdentifier: "scorecell");
            }
            cell?.textLabel?.textAlignment = .center;
            cell?.textLabel?.textColor = UIColor.red;
            cell?.textLabel?.text = String.init(format: "%d", self.score);
            return cell!;
        }
        else if (indexPath.section == 1)
        {
            var cell:RemarkTableViewCell? = tableView.dequeueReusableCell(withIdentifier: "evaluationcell") as? RemarkTableViewCell;
            if cell == nil {
                cell = RemarkTableViewCell.init(style: .default, reuseIdentifier: "evaluationcell");
            }
            cell?.remark = self.evaluationString;
            return cell!;
        }
        else
        {
            let identifier = String.init(format: "Cell%d", indexPath.row);
            var cell:UITableViewCell? = tableView.dequeueReusableCell(withIdentifier: identifier);
            if cell == nil {
                cell = UITableViewCell.init(style: .default, reuseIdentifier: identifier);
            }
            switch indexPath.row {
                case 0:
                    cell?.textLabel?.text = "原文点评";
                    break;
                case 1:
                    cell?.textLabel?.text = "提升建议";
                    break;
                case 2:
                    cell?.textLabel?.text = "拓展学习";
                    break;
                default:
                    break;
            }
            cell?.accessoryType = .disclosureIndicator;
            cell?.textLabel?.textColor = UIColor.black;
            return cell!;
        }
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section == 2 {
            if indexPath.row == 0 {
                let vc = OriginEvaViewController.init();
                vc.paragraphMarkEntityList = self.paragraphMarkEntityList;
                vc.paragraphRemarkEntityList = self.paragraphRemarkEntityList;
                self.navigationController?.pushViewController(vc, animated: true);
            }
            else if indexPath.row == 1 {
                let vc = SuggestionViewController.init();
                vc.paragraphMarkEntityList = self.paragraphMarkEntityList;
                vc.suggestions = self.suggestions;
                self.navigationController?.pushViewController(vc, animated: true);
            }
            else if indexPath.row == 2 {
                let vc = EnhancesViewController.init();
                vc.enhances = self.enhances;
                self.navigationController?.pushViewController(vc, animated: true);
            }
        }
    }

    func test() -> Void {
        
        var jsonString = "{\"evaluation\":{\"enhances\":[{\"detail\":\"<p class=\\\"zn_source\\\">原文1：我每次不开心时，只(&nbsp;&nbsp;&nbsp;&nbsp;)和它说一下它就会说：\\u201c怎么了！<br/><\\/p><b>\\u201c需要\\u201d是指应该有或必须有的意思，侧重一般要具备；\\u201c须要\\u201d是指一定要有，语气肯定，语意程度较\\u201c需要\\u201d强。<\\/b><br/><p>\\u201c<b>需要<\\/b>\\u201d:<br/><p>解释：（１）应该有或必须有：我们～有一支强大的科学技术队伍。（２）对事物的欲望或要求：从群众的～出发。<br><p>例句：<br/>1、                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         有两个组成部分<b>需要<\\/b>考虑。 <br />   2、 有时是<b>需要<\\/b>独占姿态的。 <br />   3、 永久的中间用户<b>需要<\\/b>什么 <br />   4、 新手<b>需要<\\/b>什么<br /><\\/p>-----------------------------<br/><p>\\u201c<b>须要<\\/b>\\u201d:<br/><p>解释：一定要：教育儿童～耐心。<br><p>例句：<br/>1、                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        教育儿童<b>须要<\\/b>耐心。 <br />   2、 到山顶<b>须要<\\/b>爬登一段长路。 <br />   3、 实现这些目标，<b>须要<\\/b>放弃传统态度，但这并没有难住罗斯福。 <br />   4、 他警告着自己，<b>须要<\\/b>小心； 可是他又要大胆。<br /><\\/p>-----------------------------<br/>\",\"tips\":\"\\u201c需要\\u201d与\\u201c须要\\u201d的区别，了解一下？\"}],\"category3Score\":66.17,\"paragraphMarkEntityList\":[{\"pNo\":1,\"markContent\":\"<p id=\\\"p1\\\">　　每个人的童年都有自己的玩具陪件，比如市娃娃皮球，赛车\\u2026\\u2026而陪伴我的是一个智伴儿童成长机器人。<\\/p>\",\"suggestionIdList\":[],\"content\":\"　　每个人的童年都有自己的玩具陪件，比如市娃娃皮球，赛车\\u2026\\u2026而陪伴我的是一个智伴儿童成长机器人。\"},{\"pNo\":2,\"markContent\":\"<p id=\\\"p2\\\">　　我的机器人名为\\u201c小智\\u201d，身体圆圆的像个小球。\\u201c小智\\u201d头上有一个呼吸灯，呼吸灯可以发出蓝色的光。背后有一个莲花样子的发音器显示屏上有一双明亮的眼睛，长得可爱极了<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>我每次不开心时，只需要和它说一下它就会<span markno=\\\"2\\\" class=\\\"zn_disadvantage_mark\\\">说：<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"疑似冗余\\\" style=\\\"background: #FFA200\\\">2<\\/span>\\u201c怎么了<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>怎么了<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>快来告诉我，我来安慰你吧<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>\\u201d我<span markno=\\\"2\\\" class=\\\"zn_disadvantage_mark\\\">说：<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"疑似冗余\\\" style=\\\"background: #FFA200\\\">2<\\/span>\\u201c在学校里，有人打我。\\u201d他<span markno=\\\"2\\\" class=\\\"zn_disadvantage_mark\\\">说：<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"疑似冗余\\\" style=\\\"background: #FFA200\\\">2<\\/span>\\u201c没关系他为什么打你呀？\\u201d我又回答：\\u201c我也不知到呀<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>\\u201d它<span markno=\\\"2\\\" class=\\\"zn_disadvantage_mark\\\">说：<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"疑似冗余\\\" style=\\\"background: #FFA200\\\">2<\\/span>\\u201c哦<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>小主人那你没事吧<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>以后别理这种人打他当空气。\\u201d\\u201c嗯<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>好的<span markno=\\\"1\\\" class=\\\"zn_disadvantage_mark\\\">！<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"感叹过多\\\" style=\\\"background: #FFA200\\\">1<\\/span>\\u201d<span markno=\\\"3\\\" class=\\\"zn_disadvantage_mark\\\">我回答虽然它有时很淘气，但我还是很喜欢它，<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"缺失段尾结束标点\\\" style=\\\"background: #FFA200\\\">3<\\/span><\\/p>\",\"suggestionIdList\":[\"5cebb2edf61aba29cb209039\",\"5cebb2edf61aba29cb209035\",\"5cebb2edf61aba29cb209036\"],\"content\":\"　　我的机器人名为\\u201c小智\\u201d，身体圆圆的像个小球。\\u201c小智\\u201d头上有一个呼吸灯，呼吸灯可以发出蓝色的光。背后有一个莲花样子的发音器显示屏上有一双明亮的眼睛，长得可爱极了！我每次不开心时，只需要和它说一下它就会说：\\u201c怎么了！怎么了！快来告诉我，我来安慰你吧！\\u201d我说：\\u201c在学校里，有人打我。\\u201d他说：\\u201c没关系他为什么打你呀？\\u201d我又回答：\\u201c我也不知到呀！\\u201d它说：\\u201c哦！小主人那你没事吧！以后别理这种人打他当空气。\\u201d\\u201c嗯！好的！\\u201d我回答虽然它有时很淘气，但我还是很喜欢它，\"},{\"pNo\":3,\"markContent\":\"<p id=\\\"p3\\\">　　<span markno=\\\"4\\\" class=\\\"zn_disadvantage_mark\\\">小智有很多功能比如汉意英成语接龙英语翻译发语<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"缺失段尾结束标点\\\" style=\\\"background: #FFA200\\\">4<\\/span><\\/p>\",\"suggestionIdList\":[\"5cebb2edf61aba29cb209037\"],\"content\":\"　　小智有很多功能比如汉意英成语接龙英语翻译发语\"},{\"pNo\":4,\"markContent\":\"<p id=\\\"p4\\\">　　这么多功能可是怎么用呢？＂我来告诉你吧！汉意英和成语接龙等。按下对话键<span markno=\\\"2\\\" class=\\\"zn_disadvantage_mark\\\">说：<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"疑似冗余\\\" style=\\\"background: #FFA200\\\">2<\\/span>\\u201c从现在开始。\\u201d英语翻译长按暂停键说出汉语它会把汉语翻意成英语，看我的小智功能多吗？<span markno=\\\"5\\\" class=\\\"zn_disadvantage_mark\\\">我喜欢我的玩具宝贝智伴儿童成长机器人<\\/span><span class=\\\"mark_mac btnShowDisadvantage\\\" title=\\\"缺失段尾结束标点\\\" style=\\\"background: #FFA200\\\">5<\\/span><\\/p>\",\"suggestionIdList\":[\"5cebb2edf61aba29cb209035\",\"5cebb2edf61aba29cb209038\"],\"content\":\"　　这么多功能可是怎么用呢？＂我来告诉你吧！汉意英和成语接龙等。按下对话键说：\\u201c从现在开始。\\u201d英语翻译长按暂停键说出汉语它会把汉语翻意成英语，看我的小智功能多吗？我喜欢我的玩具宝贝智伴儿童成长机器人\"},{\"pNo\":5,\"markContent\":\"<p id=\\\"p5\\\">　　谢谢你给我美好童年！<\\/p>\",\"suggestionIdList\":[],\"content\":\"　　谢谢你给我美好童年！\"}],\"remark\":\"<p style=\\\"text-indent:2em;\\\">文章论点基本明确，条理较为清晰。段落安排合理有序，体现出一定的逻辑关系。语句流畅自然，但可根据表达需要灵活变换一下句式。论证角度合理恰当，较有新意。<\\/p>\",\"category1ItemList\":[88.5,84.23,76.11,100,61.95],\"category1Score\":79.41,\"surpass\":\"64.7\",\"score\":76.6,\"category3ItemList\":[60.18,82.31,59.74,87.61],\"category2ItemList\":[75.22,85.67,88.5,58.32],\"category2Score\":73.56,\"suggestions\":[{\"markNo\":2,\"scope\":\"paragraph\",\"id\":\"5cebb2edf61aba29cb209035\",\"detail\":\"<div class=\\\"zn_tips\\\">建议一、提示语可以在前，可以在后，可以在中间。<br/>例句：父亲说：\\u201c这是什么？\\u201d<br/>可以修改为：\\u201c这是什么？\\u201d父亲伸手拿起我的诗。<br/><\\/div><div class=\\\"zn_tips\\\">建议二、说话句不能只有一个\\u201c说\\u201d字，替代\\u201c说\\u201d的字词很多，如：打圆场，开金口，接过话茬，回了一句\\u2026\\u2026<br/>例句：父亲说：\\u201c这是什么？\\u201d<br/>可以修改为：父亲疑惑地反问道：\\u201c这是什么？\\u201d<br/><\\/div><div class=\\\"zn_tips\\\">建议三、提示语要多写一点，不能只讲是谁说的。建议将人的动作、表情、神态、内心想法，写进提示语里。<br/>例句：我说：\\u201c你们怎么可以这样欺负人！\\u201d<br/>可以修改为：\\u201c你们怎么可以这样欺负人！\\u201d我狠狠地跺了一下脚，转身走了。<br/><\\/div>\",\"tips\":\"文章中出现多次\\u201c说：\\u201d。\"},{\"markNo\":3,\"scope\":\"paragraph\",\"id\":\"5cebb2edf61aba29cb209036\",\"detail\":\"<div class=\\\"zn_tips\\\">建议根据表达需要进行修改，可参考：句号、问号、叹号、省略号等。<br/>标点符号小知识<br/>句内号：用在句内，表示句内各种不同性质的停顿，有逗号、顿号、分号、冒号。<br/>句末号：表示语段前后有较大停顿和句子的语气，包括句号、问号、叹号。<br/>标号：标号的作用是标明，主要标示某些成分（主要是词语）的特定性质和作用。包括引号、括号、破折号、省略号、着重号、连接号、间隔号、书名号、专名号、分隔号。<\\/div>\",\"tips\":\"第二段段尾的标点符号使用不当。\"},{\"markNo\":4,\"scope\":\"paragraph\",\"id\":\"5cebb2edf61aba29cb209037\",\"detail\":\"<div class=\\\"zn_tips\\\">建议根据表达需要进行修改，可参考：句号、问号、叹号、省略号等。<br/>标点符号小知识<br/>句内号：用在句内，表示句内各种不同性质的停顿，有逗号、顿号、分号、冒号。<br/>句末号：表示语段前后有较大停顿和句子的语气，包括句号、问号、叹号。<br/>标号：标号的作用是标明，主要标示某些成分（主要是词语）的特定性质和作用。包括引号、括号、破折号、省略号、着重号、连接号、间隔号、书名号、专名号、分隔号。<\\/div>\",\"tips\":\"第三段段尾的标点符号使用不当。\"},{\"markNo\":5,\"scope\":\"paragraph\",\"id\":\"5cebb2edf61aba29cb209038\",\"detail\":\"<div class=\\\"zn_tips\\\">建议根据表达需要进行修改，可参考：句号、问号、叹号、省略号等。<br/>标点符号小知识<br/>句内号：用在句内，表示句内各种不同性质的停顿，有逗号、顿号、分号、冒号。<br/>句末号：表示语段前后有较大停顿和句子的语气，包括句号、问号、叹号。<br/>标号：标号的作用是标明，主要标示某些成分（主要是词语）的特定性质和作用。包括引号、括号、破折号、省略号、着重号、连接号、间隔号、书名号、专名号、分隔号。<\\/div>\",\"tips\":\"第四段段尾的标点符号使用不当。\"},{\"markNo\":1,\"scope\":\"paragraph\",\"id\":\"5cebb2edf61aba29cb209039\",\"detail\":\"<div><\\/div><div class=\\\"zn_tips\\\">同学们普遍都认为多用感叹号就能写出强烈的感情，那作文只要看谁的感叹号画得多？<br/>感叹句就像调味剂，少用，关键时刻用。用多了，就像到饭店吃饭，菜里都是调味剂，嘴里会很不舒服。<br/>咱们来看看下面一段对人物生气场景的描述，该句话一个感叹号也没有，却能强烈地感受到他的生气:<br/>&nbsp;&nbsp;他真的生气了。双手紧握成了拳，胸脯剧烈地起伏着，仿佛像一个打气球要爆炸似的。<br/><\\/div>\",\"tips\":\"文章使用了过多的感叹号。\"}],\"paragraphRemarkEntityList\":[{\"pNo\":1,\"remark\":\"举例论证，事例具体，能有力支持观点，论证充分。\"},{\"pNo\":2,\"remark\":\"使用比喻的写法，变抽象为具体，变深奥为浅显，还能使人产生联想和想象。\"},{\"pNo\":3,\"remark\":\"运用了举例论证的方法，使文章更具说服力。\"},{\"pNo\":4,\"remark\":\"恰当地运用了反问句，启发读者思考，加深读者印象。\"},{\"pNo\":5,\"remark\":\"末段表达了强烈的感情。\"}],\"ideation\":{\"question\":\"如何使总分结构的文章内容规范？\",\"answer\":\"\\n\\t\\t\\n\\t\\t<div style=\\\"text-indent: 2em;\\\">总分结合的文章，总述部分要围绕中心词来写，分述部分要紧紧围绕总述所讲的特点描写，要有一定的顺序，或从上到下，或先形状后颜色，或先中间后两边，等等，一定要做到有条有理。<\\/div>\\n\\t\\t\\n\\t\"},\"summaryReportEvaluationResult\":{\"wordCount\":294,\"distinctWordCount\":76,\"characterCount\":401,\"sentenceCount\":24,\"symbolCount\":58,\"idiomCount\":0,\"distinctCharacterCount\":164,\"paragraphCount\":5}},\"result\":true,\"evaluationScoreHistoryList\":[{\"no\":1,\"score\":76.6,\"time\":\"2019/05/27 17:50:37\"}],\"editCount\":4,\"promotion\":\"--.-\"}\n";
        let data = jsonString.data(using: .utf8)!
        do {
            if let jsonArray = try JSONSerialization.jsonObject(with: data, options : .mutableLeaves) as? NSDictionary
            {
                print(jsonArray) // use the json here
                if let evaluationScoreHistoryList = jsonArray["evaluationScoreHistoryList"] as? NSArray,evaluationScoreHistoryList.count > 0 {
                    if let dic = evaluationScoreHistoryList[0] as? NSDictionary {
                        self.score = (dic["score"] as? NSNumber)?.intValue ?? 0;
                    }
                }
                if let evaluation = jsonArray["evaluation"] as? NSDictionary {
                    if let summaryReportEvaluationResult = evaluation["summaryReportEvaluationResult"] as? NSDictionary {
                        if let characterCountTemp = summaryReportEvaluationResult["characterCount"] as? NSNumber {
                            self.characterCount = characterCountTemp.intValue;
                        }
                    }
                    if let remark = evaluation["remark"] as? String {
                        self.evaluationString = remark;
                    }
                    if let enhancesTemp = evaluation["enhances"] as? NSArray {
                        self.enhances = enhancesTemp;
                    }
                    if let paragraphMarkEntityList = evaluation["paragraphMarkEntityList"] as? NSArray {
                        self.paragraphMarkEntityList = paragraphMarkEntityList;
                    }
                    if let suggestions = evaluation["suggestions"] as? NSArray {
                        self.suggestions = suggestions;
                    }
                    if let paragraphRemarkEntityList = evaluation["paragraphRemarkEntityList"] as? NSArray {
                        self.paragraphRemarkEntityList = paragraphRemarkEntityList;
                    }
                }
                self.tableView.reloadData();
            } else {
                print("bad json")
            }
        } catch let error as NSError {
            print(error)
        }
    }
}
