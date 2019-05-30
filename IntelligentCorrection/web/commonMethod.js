jQuery.Smart = {

    /**
     * 根据分数段显示对应的提示语
     * @param score
     * @returns {string}
     */
    getAdviceTip:function(score){
        if(score <= 60){
            return "根据系统全面诊断，作文在很多方面还需多加斟酌，我们给出下面的指导建议，希望你的文章更能打动读者的心。";
        }else if(score > 60 && score <= 70){
            return "根据系统智能评测，你的文章可试着参照下面的写作技巧进行修改提升，让读者印象更深刻。";
        }else if(score > 70 && score <= 85){
            return "根据系统智能分析，愿下面的写作指导能给你一些启示，助你的作文“更上一层楼”。";
        }else if(score > 85){
            return "根据系统综合评价，你的文章已然精彩！下面的写作技巧供参考，愿你智慧的光芒更加夺目。";
        }
    },
    /**
     * 获取年级组
     */
    getGradeGroup:function () {
        var grade = [];
            grade.push({id:'3',name:'三年级'});
            grade.push({id:'4',name:'四年级'});
            grade.push({id:'5',name:'五年级'});
            grade.push({id:'6',name:'六年级'});
            grade.push({id:'7',name:'初一'});
            grade.push({id:'8',name:'初二'});
            grade.push({id:'9',name:'初三'});
            grade.push({id:'10',name:'高一'});
            grade.push({id:'11',name:'高二'});
            grade.push({id:'12',name:'高三'});
            grade.push({id:'13',name:'大学以上'});
        return grade;
    }




}