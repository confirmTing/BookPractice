<?php

define("TOKEN", "weixin");
define("SEND_MSG","https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=");
define("APPID","wxd0e0bb17a11d74ac");
define("APPSECRET","c549922b9fd7ff6c3d30b7759c426f17");
define("WEIXINHAO","xd550937586");

$wechatObj = new wechatCallbackapiTest();
if (isset($_GET['echostr'])) {
    $wechatObj->valid();
}else{
    $wechatObj->responseMsg();
}

class wechatCallbackapiTest
{
    //验证签名
    public function valid()
    {
        $echoStr = $_GET["echostr"];
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode($tmpArr);
        $tmpStr = sha1($tmpStr);
        if ($tmpStr == $signature) {
            echo $echoStr;
            exit;
        }
    }

    //响应消息
    public function responseMsg()
    {
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        if (!empty($postStr)) {
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
            $RX_TYPE = trim($postObj->MsgType);

            //消息类型分离
            switch ($RX_TYPE) {
                case "event":
                    $result = $this->receiveEvent($postObj);
                    break;
                case "text":
                    break;
                default:
                    $result = "unknown msg type: " . $RX_TYPE;
                    break;
            }
            echo $result;
        } else {
            echo "";
            exit;
        }
    }

    //接收事件消息
    private function receiveEvent($object)
    {
        $content = "";
        echo "event-->".$object->Event;
        echo "FromUserName-->".$object->FromUserName;
        $this->writeLog($object->Event);
        switch ($object->Event) {
            case "subscribe":
                    $this->getUserInfo($object->FromUserName);
                    $content = "nihao";
                break;
            case "unsubscribe":
                $content = "取消关注";
                break;
            case "CLICK":
                break;
            case "VIEW":
                $content = "跳转链接 " . $object->EventKey;
                $this->getUserInfo($object->FromUserName);
                break;
        }
        return $result;
    }


    function replyCustomer($touser, $content)
    {
        $ACC_TOKEN = $this->accessToken();
        $url = SEND_MSG . $ACC_TOKEN;
        $result = $this->https_post($url, $content);
        return $result;
    }

    function getUserInfo ($openId)
    {
        $ACC_TOKEN = $this->accessToken();
        $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=".$ACC_TOKEN."&openid=".$openId;
        $res = $this->getReturnJson($url);
        var_dump($res);
        $this->writeLog(json_encode($res));
        $nickname = $res["nickname"];
        $str = json_encode($res);
        $result = $this->http_get($nickname,$openId);
        return $result;
    }

    function http_get($str,$openid)
    {
        $url ="http://localhost:9060/RobotController/GetOpenId?UserName=".$str."&OpenId=".$openid;
        $result = file_get_contents($url);
        return $result;
    }

    function https_post($url, $data)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        if (curl_errno($curl)) {
            return 'Errno' . curl_error($curl);
        }
        curl_close($curl);
        //return $result;
        return json_decode($result, true);
    }


    function  accessToken(){
        $tokenFile = "./access_token.txt";//缓存文件名
        $data = json_decode(file_get_contents($tokenFile));
        $access_token = "";
        if($data->expire_time < time() or !$data->expire_time){
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".APPID."&secret=".APPSECRET;
            $this->writeLog($url);
            $res = $this->getReturnJson($url);
            $access_token = $res['access_token'];
            if ($access_token) {
                $data_new['expire_time'] = time() + 7000;
                $data_new['access_token'] = $access_token;
                $fp = fopen($tokenFile, "w");
                fwrite($fp, json_encode($data_new));
                fclose($fp);
            }
        }else{
            $access_token = $data->access_token;
        }
        return $access_token;
    }

    function writeLog($msg){
        $file  = 'log.txt';
        $content = $msg."\n";
        if($f  = file_put_contents($file, $content,FILE_APPEND)){
         echo "写入成功。<br />";
        }
    }

    function getReturnJson($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }

}
?>