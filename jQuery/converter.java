package rcs;
import java.io.*;
import java.nio.file.*;
public class converter {
	static String APath = "/Users/yangyanhong/Documents/marlabs/jQuery/quickProductFinder2/rcs/";
	static File finalfile = new
	public static void readFile(String path) {
		BufferedReader br = null;
		try {
			String sCurrentLine;
			br = new BufferedReader(new FileReader(path));
			while ((sCurrentLine = br.readLine())!=null){
				System.out.println(sCurrentLine);
			}
		} catch(IOException e){
			e.printStackTrace();
		} finally {
			try {
				if(br != null) br.close();
			} catch(IOException ex){
				ex.printStackTrace();
			}
	   	}
	}
	public static void main(String[] args) {
		readFile(APath.concat("spices.txt"));
	}
}
