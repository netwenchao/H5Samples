import java.util.*;
/*
冒泡排序:
1.逐个元素比较，选择最大的放到最后
时间复杂度:O(n^2)
*/
public class BubleSort 
{
    public static void main(String[] args){
        int [] arr=new int[]{1,3,55,22,11,22,45,66,89};
        System.out.println("Before Sort");
        show(arr);
        run(arr);
        System.out.println("After Sort");
        show(arr);
    }

    public static void run(int[] arr)
    {
        if(null==arr) return;
        for(int i=0;i<arr.length;i++){
            for(int j=0;j<arr.length-1-i;j++){
                if(arr[j]>arr[j+1]){
                    swap(arr,j,j+1);
                }
            }
        }
    }

    private static void swap(int[] arr,int i,int j)
    {
        int tmp=arr[i];
        arr[i]=arr[j];
        arr[j]=tmp;
    }

    private static void show(int[] arr)
    {
        if(null==arr) return;
        for (int v : arr) {
            System.out.print(v+",");
        }
    }
}
