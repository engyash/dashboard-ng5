import { environment } from '../../environments/environment';

let backendUrl = environment.production ?
'http://services.groupkt.com' :
'http://services.groupkt.com';

export class ApiGateway {
    public static country = backendUrl.concat('/country');	
  
  
}
