//
//  EnhancesViewController.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/28.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit
import WebKit

class EnhancesViewController: UIViewController {
    
    fileprivate var _enhances: NSArray?
    var enhances: NSArray?{
        set{
            _enhances=newValue
        }
        get{
            return _enhances;
        }
    }
    
    fileprivate var webView = WKWebView.init();

    override func viewDidLoad() {
        super.viewDidLoad()

        
        // Do any additional setup after loading the view.self.view.addSubview(webView);
        self.title = "拓展学习";
        
        self.view.addSubview(webView);
        webView.snp.makeConstraints { (make) in
            if #available(iOS 11.0, *) {
                make.edges.equalTo(self.view.safeAreaInsets)
            } else {
                // Fallback on earlier versions
                make.edges.equalTo(self.view);
            };
        }
        
        
        var content = "";
        if self.enhances?.count ?? 0 > 0 {
            for i in 0..<self.enhances!.count {
                if let dic = self.enhances![i] as? NSDictionary {
                    if let tips = dic["tips"] as? String,let detail = dic["detail"] as? String {
                        let str = "<div class=\"row enhanceDiv\" style=\"margin-top: 10px;margin-bottom: 10px;font-size: 20px;width: 100%\"><div class=\"col\"><div class=\"card\"><div class=\"card-body\"><h5 class=\"card-title text-info enhance\"><span>" + tips + "</span></h5><p class=\"card-text reference\"><div class=\"zn_tips\">" + detail + "</div></p></div></div></div></div></div>";
                        content += str;
                    }
                }
            }
        }
        
        
        if let htmlPath = Bundle.main.path(forResource: "common", ofType: "html", inDirectory: "") {
            do{
                if let htmlString = try String.init(contentsOfFile: htmlPath) as? String {
                    content = htmlString + content + "</body></html>";
                    self.webView.loadHTMLString(content, baseURL: URL.init(fileURLWithPath: htmlPath))
                }
            } catch let error as NSError {
                print(error)
            }
        }
    }
    

    

}
