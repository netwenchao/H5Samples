using System;
using System.IO;
using System.Text;

namespace Img2Base64
{
    class Program
    {
        static void Main(string[] args)
        {
            var file=string.Empty;
            if(args.Length==0){
                Console.WriteLine("FilePath is required.Press any key to exit.");
                Console.ReadLine();
            }
            file=args[0];
            if(!File.Exists(file))
            {
                Console.WriteLine($"File({file}) is not exists.");
            }
            try
            {                
                if(args.Length>=2 && "file".Equals(args[1])){
                    ToBase64(file,true);
                }else{
                    Console.WriteLine(ToBase64(file));
                }
            }
            catch(Exception e)
            {
                Console.WriteLine($"Failed to generate.{e.ToString()}");
            }
            Console.WriteLine("Success.");
            
        }

        private static string ToBase64(string filePath,bool toFile=false)
        {
            if(!File.Exists(filePath)){
                Console.WriteLine($"File({filePath}) is not exists.");
                throw new Exception($"File({filePath}) is not exists.");
            }
            var bytes=File.ReadAllBytes(filePath);
            var rslt= $"data:image/{Path.GetExtension(filePath).Replace(".","")};base64,{Convert.ToBase64String(bytes)}";
            if(toFile)
            {
                try{
                    File.WriteAllBytes($"{Path.GetDirectoryName(filePath)}/{Path.GetFileNameWithoutExtension(filePath)}_base64.txt",Encoding.UTF8.GetBytes(rslt));
                }
                catch(Exception e)
                {
                    Console.WriteLine(e.ToString());
                    return null;
                }
            }
            return rslt;
        }
    }
}
