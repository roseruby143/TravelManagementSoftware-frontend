import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private _httpclient : HttpClient) { }

  private _projectTitle: string = "Travel Buddy";
  public loginUser:string = "Login/Register";
  //private _bookingListfromService:any;

  public get projectTitle(): string {
    return this._projectTitle;
  }

  public set projectTitle(value: string) {
    this._projectTitle = value;
  }
  /* 

  get bookingListFromService(): any {
    return this._bookingListfromService;
  }

  set bookingListFromService(value: any) {
    this._bookingListfromService = value;
  } */
  
  getNavBarListData():Observable<any[]>{
    return this._httpclient.get<any[]>('../../assets/json/navbarList.json');
  }

  /******* ADMIN BOOKING APIs  **********/
  getBookingList():Observable<any[]>{
    return this._httpclient.get<any[]>(`${environment.baseUrl}/admin/bookings`);
  }

  updateBooking(data:any,action:any):Observable<any[]>{
    //const body = {body: data};
    let url = '';
    if(action == 'update')
    {  
      url = `${environment.baseUrl}/admin/booking/${Number(data.id)}`;
      console.log(`update url is : ${url}`);
      return this._httpclient.put<any[]>(url,data);
    }
    url = `${environment.baseUrl}/admin/booking`;
      console.log(`update url is : ${url}`);
      return this._httpclient.post<any[]>(url,data);
  }

  deleteBooking(bookingData:any):Observable<any[]>{
    const options = {body: bookingData};
    //const body = bookingData;
    const url = `${environment.baseUrl}/admin/booking/${bookingData.id}`;
    return this._httpclient.delete<any[]>(url,options);
  }

  /********** ADMIN CLIENT APIS ********/

  getAllClients():Observable<any[]>{
    return this._httpclient.get<any[]>(`${environment.baseUrl}/admin/clients`);
  }
  
  updateClient(data:any,action:any):Observable<any>{
    console.log(`update CLient for ${action} : data is - ${JSON.stringify(data)}`);
    let url = '';
    if(action == 'update')
    {  
      url = `${environment.baseUrl}/admin/client/${Number(data.clientId)}`;
      console.log(`update url is : ${url}`);
      return this._httpclient.put<any[]>(url,data);
    }
    url = `${environment.baseUrl}/admin/client`;
      console.log(`update url is : ${url}`);
      return this._httpclient.post<any[]>(url,data);
  }

  deleteClient(clientData:any):Observable<any[]>{
    const options = {body: clientData};
    //const body = bookingData;
    const url = `${environment.baseUrl}/admin/client/${clientData.clientId}`;
    return this._httpclient.delete<any[]>(url,options);
  }

  /********** ADMIN CLIENT APIS ********/

  getAllCabs():Observable<any[]>{
    return this._httpclient.get<any[]>(`${environment.baseUrl}/admin/cabs`);
  }
  
  updateCab(data:any,action:any):Observable<any>{
    console.log(`Cab for ${action} : data is - ${JSON.stringify(data)}`);
    let url = '';
    if(action == 'update')
    {  
      url = `${environment.baseUrl}/admin/cab/${Number(data.id)}`;
      console.log(`update url is : ${url}`);
      return this._httpclient.put<any[]>(url,data);
    }
    url = `${environment.baseUrl}/admin/cab`;
      console.log(`update url is : ${url}`);
      //data.id=9;
      return this._httpclient.post<any[]>(url,data);
  }

  deleteCab(cabData:any):Observable<any[]>{
    const options = {body: cabData};
    //const body = bookingData;
    const url = `${environment.baseUrl}/admin/cab/${cabData.cabId}`;
    return this._httpclient.delete<any[]>(url,options);
  }

  /******  My Bookings APIs *****/
  getMyBookings(clientId:Number):Observable<any[]> {
    const url = `${environment.baseUrl}/client/${clientId}/bookings`;
    return this._httpclient.get<any[]>(url);
  }

  deleteClientBooking(bookingData:any):Observable<any[]>{
    const options = {body: bookingData};
    //const body = bookingData;
    const url = `${environment.baseUrl}/client/${bookingData.client.clientId}/booking/${bookingData.id}`;
    return this._httpclient.delete<any[]>(url,options);
  }

  updateClientBooking(data:any,action:any):Observable<any[]>{
    //const body = {body: data};
    let url = '';
    if(action == 'update')
    {  
      url = `${environment.baseUrl}/client/${data.client.clientId}/booking/${Number(data.id)}`;
      console.log(`updamte url is : ${url}`);
      return this._httpclient.put<any[]>(url,data);
    }
    url = `${environment.baseUrl}/client/${data.client.clientId}/booking`;
      console.log(`update url is : ${url}`);
      return this._httpclient.post<any[]>(url,data);
  }
}
