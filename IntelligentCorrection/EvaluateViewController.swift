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

class EvaluateViewController: UIViewController {
    
    var articleTitle = "";
    var articleContent = "";
    var gradeID = 3;
    var editCount = 3;

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.title = "批改结果";
        self.view.backgroundColor = UIColor.white;
    }
    
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated);
        
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
        
        //登录
        Alamofire.request("https://www.znpigai.com/compositionActionv6_experience", method: .post, parameters: para, headers: dict).responseString { (response) in
            MBProgressHUD.hide(for: self.view, animated: true);
            switch(response.result) {
            case .success( _):
                if let jsonString = response.result.value {
                    let data = jsonString.data(using: .utf8)!
                    do {
                        if let jsonArray = try JSONSerialization.jsonObject(with: data, options : .allowFragments) as? [Dictionary<String,Any>]
                        {
                            print(jsonArray) // use the json here
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

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
