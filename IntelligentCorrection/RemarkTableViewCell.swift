//
//  RemarkTableViewCell.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/28.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit
import WebKit
import SnapKit

class RemarkTableViewCell: UITableViewCell {
    
    fileprivate var _remark:String!;
    var remark:String {
        get {
            guard _remark == nil else {
                return _remark;
            }
            _remark = "";
            return _remark;
        }
        set {
            _remark = newValue;
            if _remark.count > 0 {
                let htmlString = "<div id=\"remark\" class=\"thumbnail_artcle\" style=\"font-size: 45px;line-height: 60px;padding-right: 40px;\">" + _remark + "</div>";
                
                if let htmlPath = Bundle.main.path(forResource: "writing_evaluation_tab", ofType: "html", inDirectory: "") {
                    webView.loadHTMLString(htmlString, baseURL: URL.init(fileURLWithPath: htmlPath));
                }
            }
        }
    }
    
    fileprivate var webView = WKWebView.init();

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier);
        
        self.addSubview(self.webView);
        self.webView.snp.makeConstraints { (make) in
            make.edges.equalTo(self);
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
