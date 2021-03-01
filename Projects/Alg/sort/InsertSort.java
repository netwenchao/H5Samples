import java.util.*;

/*
插入排序
*/
public class InsertSort {
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
