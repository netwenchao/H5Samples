import java.util.*;
/*
快速排序：
1.选择轴
2.以轴为基准，将小于轴的放在左侧，大于轴的放在右侧；

*/
public class QuickSort {
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
        
    }

    public static int partition(){
        return 0;
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
