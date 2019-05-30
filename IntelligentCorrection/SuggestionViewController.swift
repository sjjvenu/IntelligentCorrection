//
//  SuggestionViewController.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/28.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit
import WebKit

class SuggestionViewController: UIViewController {

    fileprivate var _paragraphMarkEntityList: NSArray?
    var paragraphMarkEntityList: NSArray?{
        set{
            _paragraphMarkEntityList=newValue
        }
        get{
            return _paragraphMarkEntityList;
        }
    }
    
    fileprivate var _suggestions: NSArray?
    var suggestions: NSArray?{
        set{
            _suggestions=newValue
            if _suggestions?.count ?? 0 > 0 {
                for i in 0..<_suggestions!.count {
                    if let dic = _suggestions![i] as? NSDictionary {
                        if let id = dic["id"] as? String {
                            sugDic[id] = dic;
                        }
                    }
                }
            }
        }
        get{
            return _suggestions;
        }
    }
    
    fileprivate var sugDic = [String:NSDictionary]();
    
    fileprivate var webView = WKWebView.init();
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        // Do any additional setup after loading the view.self.view.addSubview(webView);
        self.title = "提升建议";
        
        self.view.addSubview(webView);
        webView.snp.makeConstraints { (make) in
            if #available(iOS 11.0, *) {
                make.edges.equalTo(self.view.safeAreaInsets)
            } else {
                // Fallback on earlier versions
                make.edges.equalTo(self.view);
            };
        }
        
        
        var bodyContent = "<div id=\"paragraphMarkEntityList\" class=\"thumbnail\" style=\"box-shadow: 0 0 0 0 #fff;\">";
        if self.paragraphMarkEntityList?.count ?? 0 > 0 {
            for i in 0..<self.paragraphMarkEntityList!.count {
                if let dic = self.paragraphMarkEntityList![i] as? NSDictionary {
                    if let markContent = dic["markContent"] as? String,let pNo = dic["pNo"] as? NSNumber,let content = dic["content"] as? String,let suggestionIdList = dic["suggestionIdList"] as? NSArray {
                        bodyContent = bodyContent + "<div class=\"para-odd paragraph\" style=\"margin-top: 10px;\">" +
                        "<div class=\"title-odd\">" +
                        "<span class=\"fold_button\" value=\"t\">" +
                        "<img src=\"./add.png\" class=\"rotate\" width=\"14\" height=\"14\" style=\"cursor: pointer;\">" +
                        "</span>" +
                        "<span style=\"font-size: 16px\">第<span class=\"paragraphNo\">" +
                        String.init(format: "%d", pNo.intValue) +
                        "</span>段</span>" +
                        "</div>" +
                        "<div class=\"sent_item span12 row-fluid\" style=\"padding-left:0px;margin-left:0px\">" +
                        "<span class=\"sent_text span12 paragraphContent\" style=\"color: #475669; font-size: 16px; min-height: 20px;\">" +
                        markContent +
                       "</span>" +
                        "<textarea class=\"hid_sent_text paragraphContentEditor\" style=\"display: none;\">" +
                        content +
                        "</textarea>" +
                        "</div>" +
                        "<div class=\"err_list span12\" style=\"margin-left: 5px;min-height:0px;margin-bottom:-10px\">" +
                        "<ol class=\"paragraphMarkList\" style=\"margin: 0;list-style:none;padding:0;\">";
                        if suggestionIdList.count > 0 {
                            var paragraphMarkContent = "";
                            for i in 0..<suggestionIdList.count {
                                if let sugID = suggestionIdList[i] as? String,let sugTempDic = self.sugDic[sugID] {
                                    if let tips = sugTempDic["tips"] as? String,let detail = sugTempDic["detail"] as? String,let markNo = sugTempDic["markNo"] as? NSNumber {
                                        paragraphMarkContent = paragraphMarkContent + "<li class=\"paragraphMark\" style=\"\">" +
                                        "<div class=\"span12 row-fluid\" style=\"margin-left: 0;min-height: 20px;\">" +
                                        "<span class=\"span1\" style=\"font-size: 14px;white-space: nowrap;min-width: 100px;color:#FFA200;min-height: 20px;\">【需斟酌处<span class=\"markNo\">" +
                                        String.init(format: "%d", i+1) +
                                        "</span>】</span>" +
                                        "<span class=\"err_note span10 \" style=\"font-size: 16px;color: #475669;margin-left: 0;min-height: 20px;\">" +
                                        "<span class=\"markRefRow\"><span class=\"markTips\">" +
                                        tips +
                                        "</span> ：<span class=\"markRefNo mark_mac btnShowDisadvantage\" style=\"background: #FFA200\">" +
                                        String.init(format: "%d", markNo.intValue) +
                                        "</span></span>" +
                                        "<span class=\"mark_check\" style=\"display: contents;margin-left: 0px;line-height: 10px;\">" +
                                        "<img src=\"./eye.svg\" alt=\"\" title=\"\" width=\"18\" height=\"18\">" +
                                        "<span class=\"bjyc-reset bjyc-reset_\">显示</span>" +
                                        "</span>" +
                                        "<div class=\"markDetail\" style=\"display: none;\"><div></div>" +
                                        detail +
                                        "</div>" +
                                        "</span>" +
                                        "</div>" +
                                        "<div style=\"clear:both\"></div>" +
                                        "<hr>" +
                                        "</li>"
                                    }
                                }
                            }
                            bodyContent += paragraphMarkContent;
                            bodyContent += "</li></ol></div><div style=\"clear: both\"></div>";
                        }
                    }
                }
            }
        }
        bodyContent += "</div></div>";
        
        
        if let htmlPath = Bundle.main.path(forResource: "common", ofType: "html", inDirectory: "") {
            do{
                if let htmlString = try String.init(contentsOfFile: htmlPath) as? String {
                    bodyContent = htmlString + bodyContent + "</body></html>";
                    self.webView.loadHTMLString(bodyContent, baseURL: URL.init(fileURLWithPath: htmlPath))
                }
            } catch let error as NSError {
                print(error)
            }
        }
    }
}
