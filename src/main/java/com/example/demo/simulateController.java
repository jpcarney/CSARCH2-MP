package com.example.demo;

import java.io.IOException;
import java.io.PrintWriter;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
@WebServlet("/simulateServlet")
public class SimulateServlet extends HttpServlet {
 
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
         
        // read form fields
        String blockSize = request.getParameter("blockSize");
         
        System.out.println("blockSize: " + blockSize);
 
        // do some processing here...
         
        // get response writer
        PrintWriter writer = response.getWriter();
         
        // build HTML code
        String htmlRespone = "<html>";
        htmlRespone += "<h2>Your blockSize is: " + blockSize + "<br/>";      
        htmlRespone += "</html>";
         
        // return response
        writer.println(htmlRespone);
         
    }
 
}