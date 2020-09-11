using System;
using System.Text;
using System.Linq;

namespace JWT
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
            {
                "timestamp": "1598507063",
                "appid": "RisNode156",
                "nbf": 1598509063,
                "iat": 1598507063,
                "resource": "http://172.31.3.156/report/pacsentry.aspx?accessionNumber=CR0001213&mode=mobile"
                }
            */
            var uri=new Uri("amqp://guest:guest@127.0.0.1/RIS?test=s#frag");
            Console.WriteLine("Scheme:"+uri.Scheme);
            Console.WriteLine("Host:"+uri.Host);
            Console.WriteLine("Port:"+uri.Port);
            Console.WriteLine("UserInfo:"+uri.UserInfo);
            Console.WriteLine("PathAndQuery:"+uri.PathAndQuery);
            Console.WriteLine("Query:"+uri.Query);
            Console.WriteLine("AbsolutePath:"+uri.AbsolutePath);
            Console.WriteLine("LocalPath:"+uri.LocalPath);
            Console.WriteLine("Fragment:"+uri.Fragment);
            Console.WriteLine("Segments:"+uri.Segments);


            var s=Enumerable.Range(0,9);
            foreach(var a in s){
                Console.WriteLine(a);
            }
            var date=DateTime.Now;
            var secret="PAKRey7GRZ8ZmHCvYvDQsLAwcR50";
            var header="{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
            var payload="{"
                +"\"appid\":\"RisNode156\","
                +$"\"timestamp\":{date.ToUnixTimeStampSec()},"
                +"\"resource\":\"abcde\","
                +$"\"iat\":{date.ToUnixTimeStampSec()},"
                +$"\"nbf\":{date.ToUnixTimeStampSec()}"
                +"}";
            var token=JwtCustom.GenJWT(header,payload,secret);
            var rslt=JwtCustom.DecodeJWT(token,secret);
            Console.WriteLine(token);
            Console.WriteLine($"Header:{rslt.Item1}");
            Console.WriteLine($"Payload:{rslt.Item2}");
            Console.WriteLine($"Signature:{rslt.Item3}");
            Console.WriteLine($"Valid:{rslt.Item4}");
        }    
    }
}
