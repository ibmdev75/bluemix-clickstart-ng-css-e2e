package fr.smabtp.beans;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.*;
import java.io.IOException;

/**
 * Created by karimzouba on 27/07/2014.
 */
public class ContexteSessionFilter implements Filter {

    @Autowired
    protected SessionBean session;

    final static Logger logger = LoggerFactory.getLogger(ContexteSessionFilter.class);

   
    public void destroy() {
    }

    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain fchain) throws IOException, ServletException {

        logger.info("appel serveur : "+session.getIdSession().toString());

        fchain.doFilter(request, response);
    }

    public void init(FilterConfig arg0) throws ServletException {

    }

}

