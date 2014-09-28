package fr.smabtp.beans;

import java.io.Serializable;
import java.util.UUID;

/**
 * Created by karimzouba on 27/07/2014.
 */
public class SessionBean implements Serializable {

    private static final long serialVersionUID = 4516453076354674177L;
    protected UUID idSession;


    public UUID getIdSession() {
        return idSession;
    }

    public void initSession() {
        idSession = UUID.randomUUID();

    }

}
