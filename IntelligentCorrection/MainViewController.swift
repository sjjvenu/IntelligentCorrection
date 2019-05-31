//
//  MainViewController.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/27.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit
import Alamofire
import MBProgressHUD
import WXImageCompress
import Toast_Swift
import SnapKit

class MainViewController: UIViewController,UIImagePickerControllerDelegate,UINavigationControllerDelegate,UITextViewDelegate,CutImageViewControlleDelegate {
    
    
    fileprivate var _gradeID:Int!;
    fileprivate var gradeID:Int {
        get {
            guard _gradeID == nil else {
                return _gradeID;
            }
            _gradeID = 3;
            return _gradeID;
        }
        set {
            _gradeID = newValue;
            if _gradeID >= 3 && _gradeID <= 13 {
                UserData.saveData(key: "grade", value: NSNumber.init(value: _gradeID), fileName: "userdata.plist");
            }
            switch newValue {
            case 3:
                self.gradeButton.setTitle("三年级", for: .normal);
                break;
            case 4:
                self.gradeButton.setTitle("四年级", for: .normal);
                break;
            case 5:
                self.gradeButton.setTitle("五年级", for: .normal);
                break;
            case 6:
                self.gradeButton.setTitle("六年级", for: .normal);
                break;
            case 7:
                self.gradeButton.setTitle("初一", for: .normal);
                break;
            case 8:
                self.gradeButton.setTitle("初二", for: .normal);
                break;
            case 9:
                self.gradeButton.setTitle("初三", for: .normal);
                break;
            case 10:
                self.gradeButton.setTitle("高一", for: .normal);
                break;
            case 11:
                self.gradeButton.setTitle("高二", for: .normal);
                break;
            case 12:
                self.gradeButton.setTitle("高三", for: .normal);
                break;
            case 13:
                self.gradeButton.setTitle("大学", for: .normal);
                break;
            default:
                self.gradeButton.setTitle("设置错误", for: .normal);
                break;
            }
        }
    }
    
    fileprivate var _isCleanContent:Bool!;
    fileprivate var isCleanContent:Bool {
        get {
            guard _isCleanContent == nil else {
                return _isCleanContent;
            }
            _isCleanContent = true;
            return _isCleanContent;
        }
        set {
            _isCleanContent = newValue;
            if (_isCleanContent) {
                self.contentView.text = "作文内容";
                self.contentView.textColor = UIColor.lightGray;
            }
        }
    }
    
    fileprivate var _gradeButton:UIButton!;
    fileprivate var gradeButton:UIButton {
        get {
            guard _gradeButton == nil else {
                return _gradeButton;
            }
            
            _gradeButton = UIButton.init();
            _gradeButton.setTitleColor(UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0), for: .normal);
            _gradeButton.titleLabel?.font = UIFont.systemFont(ofSize: 16);
            _gradeButton.setTitle("三年级", for: .normal);
            return _gradeButton;
        }
    }
    
    fileprivate var _titleView:UITextField!;
    fileprivate var titleView:UITextField {
        get {
            guard _titleView == nil else {
                return _titleView;
            }
            _titleView = UITextField.init();
            _titleView.textColor = UIColor.black;
            _titleView.placeholder = "作文标题";
            _titleView.layer.borderColor = UIColor.lightGray.cgColor;
            _titleView.layer.borderWidth = 0.5;
            _titleView.layer.cornerRadius = 5;
            
            return _titleView;
        }
    }
    
    fileprivate var _contentView:UITextView!;
    fileprivate var contentView:UITextView {
        get {
            guard _contentView == nil else {
                return _contentView;
            }
            _contentView = UITextView.init();
            _contentView.textColor = UIColor.lightGray;
            _contentView.delegate = self;
            _contentView.text = "作文内容";
            _contentView.font = UIFont.systemFont(ofSize: 16);
            _contentView.layer.borderColor = UIColor.lightGray.cgColor;
            _contentView.layer.borderWidth = 0.5;
            _contentView.layer.cornerRadius = 5;
            
            return _contentView;
        }
    }
    
    fileprivate var _imageTakePhotoPicker:UIImagePickerController!
    fileprivate var imageTakePhotoPicker:UIImagePickerController {
        get {
            guard _imageTakePhotoPicker == nil else {
                return _imageTakePhotoPicker;
            }
            _imageTakePhotoPicker = UIImagePickerController.init();
            _imageTakePhotoPicker.delegate = self;
            
            return _imageTakePhotoPicker;
        }
    }
    
    fileprivate var _imagePicker:UIImagePickerController!
    fileprivate var imagePicker:UIImagePickerController {
        get {
            guard _imagePicker == nil else {
                return _imagePicker;
            }
            _imagePicker = UIImagePickerController.init();
            _imagePicker.delegate = self;
            
            return _imagePicker;
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white;
        setNavButton();
        self.title = "上传作文图片";
        
        self.view.addSubview(self.titleView);
        self.titleView.snp.makeConstraints { (make) in
            make.left.equalTo(self.view).offset(20);
            make.top.equalTo(self.topLayoutGuide.snp.bottom).offset(20);
            make.right.equalTo(self.view).offset(-20);
            make.height.equalTo(40);
        }
        
        self.view.addSubview(self.contentView);
        self.contentView.snp.makeConstraints { (make) in
            make.left.equalTo(self.view).offset(20);
            make.top.equalTo(self.titleView.snp_bottom).offset(10);
            make.right.equalTo(self.view).offset(-20);
            if #available(iOS 11.0, *) {
                make.bottom.equalTo(self.view.safeAreaInsets.bottom).offset(-80);
            } else {
                // Fallback on earlier versions
                make.bottom.equalTo(self.view.snp_bottom).offset(-60);
            };
        }
        
        let label = UILabel.init();
        label.text = "批改标准：";
        label.textColor = UIColor.black;
        label.font = UIFont.systemFont(ofSize: 16);
        self.view.addSubview(label);
        label.snp.makeConstraints { (make) in
            make.left.equalTo(self.view).offset(20);
            make.top.equalTo(self.contentView.snp_bottom).offset(5);
            if #available(iOS 11.0, *) {
                make.bottom.equalTo(self.view.safeAreaInsets.bottom).offset(-40);
            } else {
                // Fallback on earlier versions
                make.bottom.equalTo(self.view.snp_bottom).offset(-20);
            };
            make.width.equalTo(85);
        }
        
        let gradeMainBtn = UIButton.init();
        self.view.addSubview(gradeMainBtn);
        gradeMainBtn.snp.makeConstraints { (make) in
            make.left.equalTo(label.snp_right);
            make.top.equalTo(self.contentView.snp_bottom).offset(5);
            if #available(iOS 11.0, *) {
                make.bottom.equalTo(self.view.safeAreaInsets.bottom).offset(-40);
            } else {
                // Fallback on earlier versions
                make.bottom.equalTo(self.view.snp_bottom).offset(-20);
            };
            make.width.equalTo(70);
        }
        gradeMainBtn.addSubview(self.gradeButton);
        self.gradeButton.snp.makeConstraints { (make) in
            make.left.top.bottom.equalTo(gradeMainBtn);
            make.right.equalTo(gradeMainBtn).offset(-20);
        }
        if let dropDown = UIImage.init(named: "drop_down") {
            let dropDownImageView = UIImageView.init(image: dropDown);
            gradeMainBtn.addSubview(dropDownImageView);
            dropDownImageView.snp.makeConstraints { (make) in
                make.centerY.equalTo(gradeMainBtn);
                make.left.equalTo(self.gradeButton.snp_right).offset(5);
                make.width.equalTo(dropDown.size.width);
                make.height.equalTo(dropDown.size.height);
            }
        }
        gradeMainBtn.addTarget(self, action: #selector(MainViewController.selectGradeClick(button:)), for: .touchUpInside);
        self.gradeButton.addTarget(self, action: #selector(MainViewController.selectGradeClick(button:)), for: .touchUpInside);
        
        let correctButton = UIButton.init();
        correctButton.setTitle("开始批改作文", for: .normal);
        correctButton.setTitleColor(.white, for: .normal);
        correctButton.backgroundColor = UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0);
        correctButton.titleLabel?.font = UIFont.systemFont(ofSize: 16);
        correctButton.layer.cornerRadius = 5;
        self.view.addSubview(correctButton);
        correctButton.snp.makeConstraints { (make) in
            make.centerY.equalTo(gradeMainBtn);
            make.right.equalTo(self.contentView);
            make.width.equalTo(110);
            make.height.equalTo(35);
        }
        correctButton.addTarget(self, action: #selector(MainViewController.intelligentCorrectClick(button:)), for: .touchUpInside);
        
        
        if let gradeIDTemp = UserData.researchData(key: "grade", fileName: "userdata.plist") as? NSNumber {
            self.gradeID = gradeIDTemp.intValue;
        }
        if self.gradeID < 3 || self.gradeID > 13 {
            self.gradeID = 3;
        }
    }

    func setNavButton() -> Void {
        let leftButton = UIButton.init(frame: CGRect(x: 0, y: 0, width: 40, height: 40));
        leftButton.setTitle("清空", for: .normal);
        leftButton.setTitleColor(UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0), for: .normal);
        self.navigationItem.leftBarButtonItem = UIBarButtonItem(customView: leftButton);
        leftButton.addTarget(self, action: #selector(MainViewController.clearButtonClick(button:)), for: .touchUpInside);
        
        let rightButton = UIButton.init(frame: CGRect(x: 0, y: 0, width: 40, height: 40));
        rightButton.setTitle("上传", for: .normal);
        rightButton.setTitleColor(UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0), for: .normal);
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(customView: rightButton);
        rightButton.addTarget(self, action: #selector(MainViewController.uploadButtonClick(button:)), for: .touchUpInside);
    }
    
    // MARK: -Button Event
    
    @objc func clearButtonClick(button:UIButton) -> Void {
        let alert = UIAlertController.init(title: "提示", message: "确定清空所有内容吗？", preferredStyle: .alert);
        let ok = UIAlertAction.init(title: "确定", style: .default) { (action) in
            self.isCleanContent = true;
            self.titleView.text = "";
        }
        alert.addAction(ok);
        let cancel = UIAlertAction.init(title: "取消", style: .cancel, handler: nil);
        alert.addAction(cancel);
        self.present(alert, animated: true, completion: nil);
    }
    
    @objc func uploadButtonClick(button:UIButton) -> Void {
        let actionSheet = UIAlertController.init(title: "上传作文图片", message: nil, preferredStyle: .actionSheet);
        let cancel = UIAlertAction.init(title: "取消", style: .cancel, handler: nil);
        actionSheet.addAction(cancel);
        let takePhoto = UIAlertAction.init(title: "拍照", style: .default) { (action) in
            self.imageTakePhotoPicker.sourceType = UIImagePickerController.SourceType.camera;
            self.imageTakePhotoPicker.allowsEditing = false;
            self.present(self.imageTakePhotoPicker, animated: true, completion: nil);
        };
        actionSheet.addAction(takePhoto);
        let photoLibrary = UIAlertAction.init(title: "相册", style: .default) { (action) in
            self.imagePicker.sourceType = UIImagePickerController.SourceType.photoLibrary;
            self.imagePicker.allowsEditing = false;
            self.present(self.imagePicker, animated: true, completion: nil);
        };
        actionSheet.addAction(photoLibrary);
        self.present(actionSheet, animated: true, completion: nil);
    }
    
    @objc func selectGradeClick(button:UIButton) -> Void {
        let actionSheet = UIAlertController.init(title: "请选择年级", message: nil, preferredStyle: .actionSheet);
        let cancel = UIAlertAction.init(title: "取消", style: .cancel, handler: nil);
        actionSheet.addAction(cancel);
        let grade3 = UIAlertAction.init(title: "三年级", style: .default) { (action) in
            self.gradeID = 3;
        };
        actionSheet.addAction(grade3);
        let grade4 = UIAlertAction.init(title: "四年级", style: .default) { (action) in
            self.gradeID = 4;
        };
        actionSheet.addAction(grade4);
        let grade5 = UIAlertAction.init(title: "五年级", style: .default) { (action) in
            self.gradeID = 5;
        };
        actionSheet.addAction(grade5);
        let grade6 = UIAlertAction.init(title: "六年级", style: .default) { (action) in
            self.gradeID = 6;
        };
        actionSheet.addAction(grade6);
        let grade7 = UIAlertAction.init(title: "初一", style: .default) { (action) in
            self.gradeID = 7;
        };
        actionSheet.addAction(grade7);
        let grade8 = UIAlertAction.init(title: "初二", style: .default) { (action) in
            self.gradeID = 8;
        };
        actionSheet.addAction(grade8);
        let grade9 = UIAlertAction.init(title: "初三", style: .default) { (action) in
            self.gradeID = 9;
        };
        actionSheet.addAction(grade9);
        let grade10 = UIAlertAction.init(title: "高一", style: .default) { (action) in
            self.gradeID = 10;
        };
        actionSheet.addAction(grade10);
        let grade11 = UIAlertAction.init(title: "高二", style: .default) { (action) in
            self.gradeID = 11;
        };
        actionSheet.addAction(grade11);
        let grade12 = UIAlertAction.init(title: "高三", style: .default) { (action) in
            self.gradeID = 12;
        };
        actionSheet.addAction(grade12);
        let grade13 = UIAlertAction.init(title: "大学及以上", style: .default) { (action) in
            self.gradeID = 13;
        };
        actionSheet.addAction(grade13);
        self.present(actionSheet, animated: true, completion: nil);
    }
    
    @objc func intelligentCorrectClick(button:UIButton) -> Void {
        
        if let title = self.titleView.text,title.count > 0, self.contentView.text.count > 0,self.isCleanContent == false
        {
            let vc = EvaluateViewController.init();
            vc.articleTitle = title;
            vc.articleContent = self.contentView.text;
            vc.gradeID = self.gradeID;
            self.navigationController?.pushViewController(vc, animated: true);
        }
        else
        {
            self.view.makeToast("标题和内容不能为空!",duration:1.0,position:.center);
        }
    }
    
    // MARK: -UITextViewDelegate
    func textViewDidBeginEditing(_ textView: UITextView) {
        if self.contentView.textColor == UIColor.lightGray {
            self.contentView.text = "";
            self.contentView.textColor = UIColor.black;
        }
    }
    
    func textViewDidEndEditing(_ textView: UITextView) {
        if self.contentView.text.count == 0 || self.contentView.text.isEmpty {
            self.contentView.text = "作文内容";
            self.contentView.textColor = UIColor.lightGray;
            self.isCleanContent = true;
        }
        else {
            self.isCleanContent = false;
        }
    }
    
    // MARK: -UIImagePickerControllerDelegate
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        self.dismiss(animated: true, completion: nil);
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        self.dismiss(animated: true, completion: nil);
        if let chosenImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
            let compressImage = chosenImage.wxCompress();
            let vc = CutImageViewController.init();
            vc.delegate = self;
            vc.resizeImage = compressImage;
            self.present(vc, animated: true, completion: nil);
            
        }
    }
    
    
    
    func imageCutCompletion(image: UIImage) {
        
        if let data = image.pngData() as NSData? {
            Alamofire.upload(multipartFormData: { (multipartFormData) in
                multipartFormData.append(data as Data, withName: "file", fileName: "1.png", mimeType: "image/png")
            }, to: "https://www.znpigai.com/ocrFileUploadAction_upload", encodingCompletion: { (result) in
                switch result {
                case .success(let upload, _, _):
                    print(result)
                    
                    let hudProgress = MBProgressHUD.showAdded(to: self.view, animated: true);
                    hudProgress.mode = MBProgressHUDMode.indeterminate;
                    hudProgress.label.text = "正在识别，请稍后";
                    
                    upload.responseJSON { response in
                        //print response.result
                        if let json = response.result.value as? NSDictionary {
                            if let result = json["result"] as? Bool,result {
                                NSLog("upload success");
                                hudProgress.hide(animated: true);
                                if let articleContent = json["articleContent"] as? String,articleContent.count > 0 {
                                    //var uploadFileUrl = json["uploadFileUrl"] as? String;
                                    if self.isCleanContent == false {
                                        self.contentView.text.append(articleContent);
                                    }
                                    else {
                                        self.contentView.text = articleContent;
                                    }
                                    self.isCleanContent = false;
                                    self.contentView.textColor = UIColor.black;
                                    return;
                                }
                            }
                        }
                        print(response);
                        hudProgress.hide(animated: true);
                        self.view.makeToast("识别失败!",duration:1.0,position:.center);
                    }
                    
                case .failure(let encodingError):
                    print(encodingError);
                    self.view.makeToast("上传图片失败!",duration:1.0,position:.center);
                }
            })
            
            
        }
    }
}
