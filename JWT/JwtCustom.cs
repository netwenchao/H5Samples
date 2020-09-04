using System;
using System.Text;
using System.Security.Cryptography;

public class JwtCustom{

    public static string GenJWT(string head,string payload,string secret)
    {
        var basedHeader=Base64URLSafe(head);
        var basedPayload=Base64URLSafe(payload);
        var data=string.Format("{0}.{1}",basedHeader,basedPayload);
        var basedSign=GenSignature(data,secret);        
        return string.Format("{0}.{1}",data,basedSign);
    }

    private static string GenSignature(string data,string secret)
    {
        using(var encoder=new HMACSHA256(Encoding.UTF8.GetBytes(secret))){
            var hash=encoder.ComputeHash(Encoding.UTF8.GetBytes(data));
            return Base64URLSafe(hash);
        }
    }

    public static Tuple<string,string,string,bool> DecodeJWT(string token,string secret)
    {
        if(String.IsNullOrWhiteSpace(token)) throw new Exception("Token can't be null or empty.");
        var parts=token.Split(".");
        if(parts.Length>3 || parts.Length<2){
            throw new Exception("Invalid token.");
        }

        var header=DecodeBase64URLSafe(parts[0]);
        var payload=DecodeBase64URLSafe(parts[1]);
        var sign=parts.Length==3?parts[2]:string.Empty;
        var valid=string.IsNullOrWhiteSpace(sign) || GenSignature($"{parts[0]}.{parts[1]}",secret)==sign;
        return new Tuple<string, string,string, bool>(header,payload,sign,valid);
    }

    private static string Base64URLSafe(byte[] bytes){
        return Convert.ToBase64String(bytes)
            .Replace("=","")
            .Replace("+","-")
            .Replace("/","_");
    }
    private static string Base64URLSafe(string str){
        return Base64URLSafe(Encoding.UTF8.GetBytes(str));
    }

    private static string DecodeBase64URLSafe(string str)
    {
        var padLen=(str.Length%4);
        padLen=padLen==0?0:(4-padLen);
        var tmp=str;
        while((padLen--)>0){
            tmp+="=";
        }
        tmp=tmp.Replace("-","+").Replace("_","/");
        return Encoding.UTF8.GetString(Convert.FromBase64String(tmp));
    }    
}

public static class Utils
{
    private static DateTime BASE_UNIX=new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc);
    public static long ToUnixTimeStampSec(this DateTime date){
        var t=date;
        if(t.Kind==DateTimeKind.Unspecified)
            t=DateTime.SpecifyKind(t, DateTimeKind.Local);
        return (long)(t.ToUniversalTime()-BASE_UNIX).TotalSeconds;
    }

    public static DateTime FromUnixTimeStampSec(long secs){
        var date=BASE_UNIX.AddSeconds(secs);
        date=DateTime.SpecifyKind(date,DateTimeKind.Utc);
        return date.ToLocalTime();
    }
}