//
//  UserData.swift
//  IntelligentCorrection
//
//  Created by tdx on 2019/5/29.
//  Copyright © 2019 sjjvenu. All rights reserved.
//

import UIKit

class UserData: NSObject {
    //写入
    class func saveData(key: String, value: Any, fileName: String) -> () {
        let paths = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true) as NSArray
        let documentsDirectory = paths.object(at: 0) as! NSString
        let path = documentsDirectory.appendingPathComponent(fileName)
        let dict: NSMutableDictionary = NSMutableDictionary()
        dict.setValue(value, forKey: key)
        dict.write(toFile: path, atomically: false)
    }
    
    //读取
    class func researchData(key: String, fileName: String) -> Any {
        let paths = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true) as NSArray
        let documentsDirectory = paths[0] as! NSString
        let path = documentsDirectory.appendingPathComponent(fileName)
        let fileManager = FileManager.default
        if(!fileManager.fileExists(atPath: path)) {
            if let bundlePath = Bundle.main.path(forResource: fileName, ofType: nil) {
                try! fileManager.copyItem(atPath: bundlePath, toPath: path)
            } else {
                print(fileName + " not found. Please, make sure it is part of the bundle.")
            }
        } else {
            print(fileName + " already exits at path.")
        }
        let myDict = NSDictionary(contentsOfFile: path)
        if let dict = myDict {
            return dict.object(forKey: key) ?? ""
        } else {
            print("WARNING: Couldn't create dictionary from " + fileName + "! Default values will be used!")
            return ""
        }
    }
}
