using System;
using System.Text;
using System.Text.Encodings;
using System.Collections.Generic;
using StackExchange.Redis;

namespace RedisClient
{
    class Program
    {
        static void Main(string[] args)
        {
            var strs2Encode=new List<string>{
                "15912410774",
                "dong.wenchao@hinacom.com",
                "dong1.wencha2o@hinacom.com",
                "18522154715",
                "13522154715",
                "110322201209210124"};

            for(var i=15912410102;i<15912411102;i++){
                strs2Encode.Add(i.ToString());
            }

            foreach(var str in strs2Encode){
                var tmp=Encoder.Encode(str);
                Console.WriteLine($"{str}:{tmp}:{Encoder.Decode(tmp)==str}>>{Encoder.Decode(tmp)}");
            }
        }

        public static void RedisTest()
        {
            var conn=ConnectionMultiplexer.Connect("127.0.0.1");
            var endpoints=conn.GetEndPoints();
            foreach(var e in endpoints){
                Console.WriteLine(e);
            }
        }

        delegate void ShowMessage(string msg);

        public static void DelegateList(){
            ShowMessage sm=showInConsole;
            sm+=showInMessagebox;
            sm("Test");
            foreach(ShowMessage i in sm.GetInvocationList()){
                i("AAA");
            }
        }

        public static void showInConsole(string msg){
            Console.WriteLine("Console:{0}",msg);
        }
        public static void showInMessagebox(string msg){
            Console.WriteLine("MessageBox:{0}",msg);
        }
    }

    public class Encoder
    {
        private static readonly byte salt=111;
        private static readonly string[] paddinStrs=new string[]{"","=","==","==="};
        public static string Encode(string str)
        {
            if(string.IsNullOrEmpty(str)) return str;
            var bytes=Encoding.UTF8.GetBytes(str);
            bytes[0]^=salt;
            bytes[bytes.Length-1]^=salt;
            return Convert.ToBase64String(bytes).Replace("=","").Replace("/","_").Replace("+","-");
        }

        public static string Decode(string str)
        {
            if(string.IsNullOrEmpty(str)) return str;
            var source=str.Replace("_","/").Replace("-","+")+paddinStrs[(4-str.Length%4)%4];
            var bytes = Convert.FromBase64String(source);
            bytes[0]^=salt;
            bytes[bytes.Length-1]^=salt;
            return Encoding.UTF8.GetString(bytes);
        }

    }
}
