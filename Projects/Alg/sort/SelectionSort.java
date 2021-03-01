import java.util.*;
/*
选择排序:
1.从第i个元素开始，选择最小元素与第一个元素交换
2.重复1
时间复杂度:O(n^2)
*/
public class SelectionSort{

    public static void main(String[] args){
        int [] arr=new int[]{1,3,55,22,11,22,45,66,89};
        show(arr);
        run(arr);
        show(arr);
    }

    public static void run(int[] arr)
    {
        if(null==arr) return;
        int minIdx=0;
        for(int i=0;i<arr.length;i++){
            minIdx=i;
            for(int j=i+1;j<arr.length;j++){
                if(arr[minIdx]>arr[j]){
                    minIdx=j;
                }
            }
            swap(arr, i, minIdx);
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