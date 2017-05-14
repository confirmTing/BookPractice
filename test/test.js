
var str = '{"companyid":1,"companyname":"上海胤元电子商务有限公司","companycode":"YY","createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"depart":[{"departmentid":1,"departmentname":"it","companyid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"post":[{"positionid":1,"parentpositionid":null,"positionname":"产品经理","companyid":1,"departmentid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"emp":[{"employeeid":2,"employeename":"admin","companyid":1,"departmentid":1,"positionid":1,"platformid":16,"teamid":null,"phone":null,"hiredate":null,"hiredatestr":null,"status":null,"recruitsource":null,"sex":null,"ismarried":null,"education":null,"school":null,"specialty":null,"languageability":null,"experience":null,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"companyname":null,"departmentname":null,"positionname":null,"platformname":null,"teamname":null,"team":null}],"team":null},{"positionid":2,"parentpositionid":null,"positionname":"销售经理","companyid":1,"departmentid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"emp":[{"employeeid":2,"employeename":"admin","companyid":1,"departmentid":1,"positionid":1,"platformid":16,"teamid":null,"phone":null,"hiredate":null,"hiredatestr":null,"status":null,"recruitsource":null,"sex":null,"ismarried":null,"education":null,"school":null,"specialty":null,"languageability":null,"experience":null,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"companyname":null,"departmentname":null,"positionname":null,"platformname":null,"teamname":null,"team":null}],"team":null},{"positionid":3,"parentpositionid":1,"positionname":"程序员","companyid":1,"departmentid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"emp":[{"employeeid":2,"employeename":"admin","companyid":1,"departmentid":1,"positionid":1,"platformid":16,"teamid":null,"phone":null,"hiredate":null,"hiredatestr":null,"status":null,"recruitsource":null,"sex":null,"ismarried":null,"education":null,"school":null,"specialty":null,"languageability":null,"experience":null,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"companyname":null,"departmentname":null,"positionname":null,"platformname":null,"teamname":null,"team":null}],"team":null},{"positionid":4,"parentpositionid":3,"positionname":"程序员小弟","companyid":1,"departmentid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"emp":[{"employeeid":2,"employeename":"admin","companyid":1,"departmentid":1,"positionid":1,"platformid":16,"teamid":null,"phone":null,"hiredate":null,"hiredatestr":null,"status":null,"recruitsource":null,"sex":null,"ismarried":null,"education":null,"school":null,"specialty":null,"languageability":null,"experience":null,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"companyname":null,"departmentname":null,"positionname":null,"platformname":null,"teamname":null,"team":null}],"team":null},{"positionid":5,"parentpositionid":null,"positionname":"eBay不资深销售主管","companyid":1,"departmentid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"emp":[{"employeeid":2,"employeename":"admin","companyid":1,"departmentid":1,"positionid":1,"platformid":16,"teamid":null,"phone":null,"hiredate":null,"hiredatestr":null,"status":null,"recruitsource":null,"sex":null,"ismarried":null,"education":null,"school":null,"specialty":null,"languageability":null,"experience":null,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"companyname":null,"departmentname":null,"positionname":null,"platformname":null,"teamname":null,"team":null}],"team":null}]},{"departmentid":2,"departmentname":"市场部","companyid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"post":null},{"departmentid":3,"departmentname":"产品部","companyid":2,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"post":null},{"departmentid":4,"departmentname":"产品部","companyid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"post":null},{"departmentid":5,"departmentname":"产品部","companyid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"post":null},{"departmentid":6,"departmentname":"www","companyid":2,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"post":null},{"departmentid":7,"departmentname":"王者部","companyid":1,"createdby":null,"createdon":null,"createdonstr":null,"updatedby":null,"updatedon":null,"updatedonstr":null,"deletedby":null,"deletedon":null,"deletedonstr":null,"post":null}],"plat":null}';

var obj = JSON.parse(str);
// console.log(obj);

function filter(obj){
    var result = {};
    result.id = obj.companyid;
    result.name = obj.companyname;
    result.children = getChildren(obj.depart,"depart");
    return result;
}


var keyNameObj = {
    "depart": "department",
    "post": "position",
    "emp": "employee"
}

function getChildren(arr,keyName){
    keyName = keyNameObj[keyName] || keyName;
    var result = [];
    arr.forEach(function(item){
        var obj = {
            id:item[keyName+"id"],
            name:item[keyName+"name"]
        }
        for(var k in item){
            if({}.toString.call(item[k]) === "[object Array]"){
                obj.children = getChildren(item[k],k);
            }
        }
        result.push(obj);
    })
    return result;
}

// var arr = [obj];
// console.log(getChildren(arr,"company")[0])

console.log(filter(obj));
