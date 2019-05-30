//
//  OriginEvaViewController.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/28.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit
import WebKit

class OriginEvaViewController: UIViewController {

    fileprivate var _paragraphMarkEntityList: NSArray?
    var paragraphMarkEntityList: NSArray?{
        set{
            _paragraphMarkEntityList=newValue
        }
        get{
            return _paragraphMarkEntityList;
        }
    }
    
    fileprivate var _paragraphRemarkEntityList: NSArray?
    var paragraphRemarkEntityList: NSArray?{
        set{
            _paragraphRemarkEntityList=newValue
            if _paragraphRemarkEntityList?.count ?? 0 > 0 {
                for i in 0..<_paragraphRemarkEntityList!.count {
                    if let dic = _paragraphRemarkEntityList![i] as? NSDictionary {
                        if let pNo = dic["pNo"] as? NSNumber, let remark = dic["remark"] as? String {
                            let keyString = String.init(format: "pNo%d", pNo.intValue);
                            pNoDic[keyString] = remark;
                        }
                    }
                }
            }
        }
        get{
            return _paragraphRemarkEntityList;
        }
    }
    
    fileprivate var pNoDic = [String:String]();
    
    fileprivate var webView = WKWebView.init();
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        // Do any additional setup after loading the view.self.view.addSubview(webView);
        self.title = "原文点评";
        
        self.view.addSubview(webView);
        webView.snp.makeConstraints { (make) in
            if #available(iOS 11.0, *) {
                make.edges.equalTo(self.view.safeAreaInsets)
            } else {
                // Fallback on earlier versions
                make.edges.equalTo(self.view);
            };
        }
        
        
        var content = "<div id=\"table_anno\"><div id=\"paragraphMarkEntityList\" class=\"thumbnail\" style=\"box-shadow: 0 0 0 0 #fff;\">";
        if self.paragraphMarkEntityList?.count ?? 0 > 0 {
            for i in 0..<self.paragraphMarkEntityList!.count {
                if let dic = self.paragraphMarkEntityList![i] as? NSDictionary {
                    if let pNo = dic["pNo"] as? NSNumber ,let markContent = dic["markContent"] as? String {
                        let str = "";
                        content = content + str + markContent.replacingOccurrences(of: "style=\"background: #FFA200\"", with: "style=\"background: #FFA200;display: none;\"");
                        let keyString = String.init(format: "pNo%d", pNo.intValue);
                        if let remark = self.pNoDic[keyString] {
                            content = content + "<p class=\"zn_remark\">" + remark + "</p>";
                        }
                    }
                }
            }
        }
        content += "</div></div>";
        
        
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
