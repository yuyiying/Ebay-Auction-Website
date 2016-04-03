package edu.ucla.cs.cs144;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ProxyServlet extends HttpServlet implements Servlet {
       
    public ProxyServlet() {}

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        // your codes here
    	String query = preventNullString(request.getParameter("q"));
    	URL url = new URL("http://google.com/complete/search?output=toolbar&q="+query);
    	HttpURLConnection conn = (HttpURLConnection) url.openConnection();  
    	conn.setConnectTimeout(15000);  
    	conn.setRequestMethod("GET");
    	// conn.setRequestProperty("Content-Type","text/xml; charset=UTF-8");
    	BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    	String line = "";
    	String tmp;
        while ((tmp = in.readLine()) != null) {
            line += tmp;
        }
        response.setContentType("text/xml;charset=UTF-8");
        OutputStream out = response.getOutputStream();
        out.write(line.getBytes(), 0, line.getBytes().length);
        out.close();
        // request.setAttribute("q", line);
        // request.getRequestDispatcher("/test.jsp").forward(request, response);
    }
    
    public String preventNullString(String str) {
		if(str==null) {
			return "";
		}
		return str;
	}
}

