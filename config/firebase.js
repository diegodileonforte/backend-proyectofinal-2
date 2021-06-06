import admin from "firebase-admin";

export default class FirebaseConfig {

    constructor(dbName) {
        this.collection = this.connect()
        this.db = admin.firestore()
        this.query = this.db.collection(dbName)

    }

    connect = () => {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    "type": "service_account",
                    "project_id": "backend-ecommerce-82cf7",
                    "private_key_id": "9c6ae158f6c09964206ea861aa63888880419598",
                    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDqHqul6HsoVSMk\nnj2dErqtBsSXuiFlQVWvh7DwqORdjdn/Uvrgox3zV+kBoP0+OLraaL/DCs3esk8P\nFQbwWFLDas8w1xnolkMEV+gGAsI9ttBEuXdGRQ7h3NUB74aHnJL4Dy1A1Wea1qyj\nwWEce52nC1B35cH1Gm8lFqZdy1YUlD4Kbf1TB0IdfqgGwKji+1n5jShP/pYHK/uY\niB4EM1Jq8a7EBW0db9AZ4kOw2TS3Uum+rayaFBwNQ3QaA7BQZfA+qSiphIgxlHeY\n4qnqDOLxy8kErdipjL0uif8BLyvu6UopWl720kBD3rWvIymgpx5AzZEtdb3gUQfc\ne+YMDPbnAgMBAAECggEADEMT+WoOPUQMRag2EOqAtXxDwrCgfCWqX7mrJkeqQk4i\nK1HEywwwDuU9UnUEnoQpITRYStZfhvju1BrlVKRDnXGULXoupLRuCSWzhNETLFlN\nWjQej6MhTuoai/HoKWUle3GMDLfAp+bzftYriGrfDHc2vTje6j/6r0Ya65GxTf2G\nBX6/IFV73Bb0xrtMLN/nYqMcVY0ci5mLAoREctoonSkd+VUjYYQqn7aikfN7qR3k\nJQ1UcFspcCq4zxZZ0c/e56JiMiKoDUZxceq5Gn7HjksvzTMu3sxDWjUVCwn1Wwcy\n6PWDpF/X8jN2IWFO+bKIdkJ0AH5ZDSP1gxJg81ku2QKBgQD6jcQfCsDYnYBmd96N\nurGdqhJ5YYFzIejlCf75cM5xwQrW6ypDjwz6tNQTSLcLxGfxdXDHBp00HADPPJc9\n/v9Wu39GeNNbfEdLgOF1npYCb2KoMVdNP8ekmlRP5quKBvgAas9q+NNe1rYZErH1\nAOrSTbGEyTQdojvwrg3ukZa/TwKBgQDvNXSuzi1pt95FT3vTLHVruO/24/CLJPKk\n4/wv3as/W6YYvItOphlvafVepASnnh16qIRru9e6T74m/G//ANbA7ZtVkOAllz7f\nnwV9vbG3vs2oFkadwvWGef/RU8rdiOJ9AdIYlSKxZI0o6QEe658MiKa2cNWhBseW\n3LJbI6Oo6QKBgQDHHDv78z63pcqxI5dACFo4EjymKz+FMDB1O5FdxzC4I5Gqo62t\njJPi9CsIvCOC/W0g7JRYBcCN9acLCXqjcO6XjV8isMg+DrBVpzEEmKdbfgrn4HYh\nVIsiGubfrE8r3EffhQIaX20SFA0YNcwoCLeTstxcysxYtGFv7dHygc5LbwKBgQC3\nmBOiRuRcC58xGzwybCEDOMIUgAYTBZymKcVZB41z52en/K3/A0TqWizVIpXgAF8n\n0UcxWM7OVH3hdkaPNZmeIb/jAHrI3ziGcYrJY1qPaIZ3yAES/JttRx2tD97YAUO0\nJj2WWIB0HnSpPYx6quU7vXYW+Ks+F/IAPAs4IDZwYQKBgQDIwj7/zYUDbNndOiW1\nmvXGDfQyq0DGmWqMyt3h6kVeBVDvQpi5dY205kezwMHTdbAkHxpV7H/K+Vsp0c1f\najIZ2SSF83809JFy+JZZrVZ47L8KxiPCH6LVMbjf1cvhvEbQE5jzuD0XCIQJS21B\n4OFGz/QYRULe6qkhljVGmCDWzw==\n-----END PRIVATE KEY-----\n",
                    "client_email": "firebase-adminsdk-lzvp5@backend-ecommerce-82cf7.iam.gserviceaccount.com",
                    "client_id": "116090868853237278677",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lzvp5%40backend-ecommerce-82cf7.iam.gserviceaccount.com"
                })
            })
        } else {
            admin.app()
        }
    };
}
