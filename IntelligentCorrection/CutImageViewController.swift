//
//  CutImageViewController.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/30.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit
import JPImageresizerView
import Toast_Swift

let TU_IS_IPHONE = (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiom.phone)

let TU_SCREEN_WIDTH = UIScreen.main.bounds.width
let TU_SCREEN_HEIGHT = UIScreen.main.bounds.height
let TU_SCREEN_MAX_LENGTH = max(TU_SCREEN_WIDTH, TU_SCREEN_HEIGHT)
let TU_SCREEN_MIN_LENGTH = min(TU_SCREEN_WIDTH, TU_SCREEN_HEIGHT)

let TU_IS_IPHONE_X = (TU_IS_IPHONE && TU_SCREEN_MAX_LENGTH == 812.0)
let TU_IS_IPHONE_XS = TU_IS_IPHONE_X
let TU_IS_IPHONE_X_XS = TU_IS_IPHONE_X
let TU_IS_IPHONE_XR = (TU_IS_IPHONE && TU_SCREEN_MAX_LENGTH == 896.0)
let TU_IS_IPHONE_XSMAX = TU_IS_IPHONE_XR
let TU_IS_IPHONE_XR_XSMAX = TU_IS_IPHONE_XR
let TU_IS_IPHONE_FULLSCREEN = (TU_IS_IPHONE_X_XS || TU_IS_IPHONE_XR_XSMAX)

let TU_Home_Indicator  = (TU_IS_IPHONE_FULLSCREEN ? 34:0)
let TU_StatusBarHeight = (TU_IS_IPHONE_FULLSCREEN ? 44:20)
let TU_SysNavbarHeight = 44

protocol CutImageViewControlleDelegate:NSObjectProtocol{
    
    func imageCutCompletion(image:UIImage);
    
}

class CutImageViewController: UIViewController {
    
    weak var delegate: CutImageViewControlleDelegate?
    
    var resizeImage:UIImage?;
    fileprivate var imageresizerView:JPImageresizerView?;
    fileprivate var rotateBtn = UIButton.init();
    fileprivate var resetBtn = UIButton.init();
    fileprivate var cutBtn = UIButton.init();

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.title = "编辑图片";
        self.view.backgroundColor = .white;
        
        let rect = UIScreen.main.bounds;
        
        let backButton = UIButton.init(frame: CGRect.init(x: 15, y: CGFloat(TU_StatusBarHeight)+5, width: 50, height: 30));
        backButton.setTitle("返回", for: .normal);
        backButton.setTitleColor(UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0), for: .normal);
        backButton.addTarget(self, action: #selector(CutImageViewController.backButtonClick(button:)), for: .touchUpInside);
        self.view.addSubview(backButton);
        
        let uploadButton = UIButton.init(frame: CGRect.init(x: rect.size.width-65, y: CGFloat(TU_StatusBarHeight)+5, width: 50, height: 30));
        uploadButton.setTitle("上传", for: .normal);
        uploadButton.setTitleColor(UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0), for: .normal);
        uploadButton.addTarget(self, action: #selector(CutImageViewController.uploadButtonClick(button:)), for: .touchUpInside);
        self.view.addSubview(uploadButton);
        
        if self.resizeImage != nil {
            self.imageresizerView = JPImageresizerView.init(resize: self.resizeImage!, frame: CGRect.init(x: 15, y: CGFloat(TU_StatusBarHeight+TU_SysNavbarHeight), width: rect.size.width-30, height: rect.size.height-CGFloat(TU_StatusBarHeight+TU_SysNavbarHeight+TU_Home_Indicator)-60), maskType: .normalMaskType, frameType: .classicFrameType, animationCurve: .easeOut, stroke: .white, bgColor: .black, maskAlpha: 0.75, verBaseMargin: 10, horBaseMargin: 10, resizeWHScale: 0, contentInsets: UIEdgeInsets.zero, imageresizerIsCanRecovery: { [weak self](isCanRecovery) in
                self?.resetBtn.isEnabled = isCanRecovery;
            }, imageresizerIsPrepareToScale: { [weak self](isPrepareToScale) in
                let enabled = !isPrepareToScale;
                self?.rotateBtn.isEnabled = enabled;
                self?.cutBtn.isEnabled = enabled;
            })
            self.view.addSubview(self.imageresizerView!);
            
            
            self.resetBtn.frame = CGRect.init(x: 15, y: self.imageresizerView!.frame.origin.y+self.imageresizerView!.frame.size.height+10, width: 70, height: 40);
            self.resetBtn.setTitle("重置", for: .normal);
            self.resetBtn.setTitleColor(.white, for: .normal);
            self.resetBtn.setTitleColor(.gray, for: .disabled);
            self.resetBtn.backgroundColor = UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0);
            self.resetBtn.layer.cornerRadius = 3;
            self.resetBtn.addTarget(self, action: #selector(CutImageViewController.resetButtonClick(button:)), for: .touchUpInside);
            self.view.addSubview(self.resetBtn);
            
            self.rotateBtn.frame = CGRect.init(x: rect.size.width/2-35, y: self.imageresizerView!.frame.origin.y+self.imageresizerView!.frame.size.height+10, width: 70, height: 40);
            self.rotateBtn.setTitle("旋转", for: .normal);
            self.rotateBtn.setTitleColor(.white, for: .normal);
            self.rotateBtn.setTitleColor(.gray, for: .disabled);
            self.rotateBtn.backgroundColor = UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0);
            self.rotateBtn.layer.cornerRadius = 3;
            self.rotateBtn.addTarget(self, action: #selector(CutImageViewController.rotateButtonClick(button:)), for: .touchUpInside);
            self.view.addSubview(self.rotateBtn);
            
            self.cutBtn.frame = CGRect.init(x: rect.size.width-15-70, y: self.imageresizerView!.frame.origin.y+self.imageresizerView!.frame.size.height+10, width: 70, height: 40);
            self.cutBtn.setTitle("裁剪", for: .normal);
            self.cutBtn.setTitleColor(.white, for: .normal);
            self.cutBtn.setTitleColor(.gray, for: .disabled);
            self.cutBtn.backgroundColor = UIColor.init(red: 46.0/255.0, green: 138.0/255.0, blue: 254.0/255.0, alpha: 1.0);
            self.cutBtn.layer.cornerRadius = 3;
            self.cutBtn.addTarget(self, action: #selector(CutImageViewController.cutButtonClick(button:)), for: .touchUpInside);
            self.view.addSubview(self.cutBtn);
        }
        
        
        // 注意：iOS11以下的系统，所在的controller最好设置automaticallyAdjustsScrollViewInsets为NO，不然就会随导航栏或状态栏的变化产生偏移
        if #available(iOS 11.0, *) {
            
        } else {
            self.automaticallyAdjustsScrollViewInsets = false;
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated);
    }
    
    
    // MARK: -Button Event
    
    @objc func backButtonClick(button:UIButton) -> Void {
        self.dismiss(animated: true, completion: nil);
    }
    
    @objc func uploadButtonClick(button:UIButton) -> Void {
        if self.resizeImage != nil {
            self.delegate?.imageCutCompletion(image: self.resizeImage!);
        }
        self.dismiss(animated: true, completion: nil);
    }
    
    @objc func resetButtonClick(button:UIButton) -> Void {
        self.imageresizerView?.recovery();
    }
    
    @objc func rotateButtonClick(button:UIButton) -> Void {
        self.imageresizerView?.rotation();
    }
    
    @objc func cutButtonClick(button:UIButton) -> Void {
        self.imageresizerView?.imageresizer(complete: { [weak self](image) in
            if image != nil {
                self?.delegate?.imageCutCompletion(image: image!);
                self?.resizeImage = image;
                self?.imageresizerView?.resizeImage = image;
            }
        })
    }

}
