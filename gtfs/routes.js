export const returnRoutes = () => {
  const routes = `route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color
  1,MTA NYCT,1,Broadway - 7 Avenue Local,"Trains operate between 242 St in the Bronx and South Ferry in Manhattan, most times",1,http://web.mta.info/nyct/service/pdf/t1cur.pdf,EE352E,
  2,MTA NYCT,2,7 Avenue Express,"Trains operate between Wakefield-241 St, Bronx, and Flatbush Av-Brooklyn College, Brooklyn, at all times. Trains operate local in Bronx and Brooklyn. Trains operate express in Manhattan except late night when it operates local.",1,http://web.mta.info/nyct/service/pdf/t2cur.pdf,EE352E,
  3,MTA NYCT,3,7 Avenue Express,"Trains operate between 148 St, 7 Av, Manhattan, and New Lots Av, Brooklyn, at all times except late nights. During late nights, trains operate only in Manhattan between 148 St, 7 Av and Times Square-42 St.",1,http://web.mta.info/nyct/service/pdf/t3cur.pdf,EE352E,
  4,MTA NYCT,4,Lexington Avenue Express,"Trains operate daily between Woodlawn/Jerome Av, Bronx, and Utica Av/Eastern Pkwy, Brooklyn, running express in Manhattan and Brooklyn. During late night and early morning hours, trains runs local in Manhattan and Brooklyn, and extends beyond Utica Av to New Lots/Livonia Avs, Brooklyn.",1,http://web.mta.info/nyct/service/pdf/t4cur.pdf,00933C,
  5,MTA NYCT,5,Lexington Avenue Express,"Weekdays daytime, most trains operate between either Dyre Av or 238 St-Nereid Av, Bronx, and Flatbush Av-Brooklyn College, Brooklyn. At all other times except during late nights, trains operate between Dyre Av, Bronx, and Bowling Green, Manhattan. During late nights trains operate only in the Bronx between Dyre Av and E 180 St/MorrisPark Av. Customers who ride during late night hours can transfer to 2 service at the E 180 St Station. At all times, trains operate express in Manhattan and Brooklyn. Weekdays, trains in the Bronx operate express from E 180 St to 149 St-3 Av during morning rush hours (from about 6 AM to 9 AM), and from 149 St-3 Av to E 180 St during the evening rush hours (from about 4 PM to 7 PM).",1,http://web.mta.info/nyct/service/pdf/t5cur.pdf,00933C,
  5X,MTA NYCT,5X,Lexington Avenue Express,"Weekdays daytime, most trains operate between either Dyre Av or 238 St-Nereid Av, Bronx, and Flatbush Av-Brooklyn College, Brooklyn. At all other times except during late nights, trains operate between Dyre Av, Bronx, and Bowling Green, Manhattan. During late nights trains operate only in the Bronx between Dyre Av and E 180 St/MorrisPark Av. Customers who ride during late night hours can transfer to 2 service at the E 180 St Station. At all times, trains operate express in Manhattan and Brooklyn. Weekdays, trains in the Bronx operate express from E 180 St to 149 St-3 Av during morning rush hours (from about 6 AM to 9 AM), and from 149 St-3 Av to E 180 St during the evening rush hours (from about 4 PM to 7 PM).",1,http://web.mta.info/nyct/service/pdf/t5cur.pdf,00933C,
  6,MTA NYCT,6,Lexington Avenue Local,"Local trains operate between Pelham Bay Park/Bruckner Expwy, Bronx, and Brooklyn Bridge/City Hall, Manhattan, at all times.",1,http://web.mta.info/nyct/service/pdf/t6cur.pdf,00933C,
  6X,MTA NYCT,6X,Lexington Avenue Express,"Express trains operate between Pelham Bay Park/Bruckner Expwy, Bronx, and Brooklyn Bridge/City Hall, Manhattan, weekday mornings toward Manhattan. Weekday afternoons and evenings, these trains operate express to the Bronx.",1,http://web.mta.info/nyct/service/pdf/t6cur.pdf,00A65C,
  7,MTA NYCT,7,Flushing Local,"Trains operate between Main St-Flushing, Queens, and 11th Av-34th St, at all times. ",1,http://web.mta.info/nyct/service/pdf/t7cur.pdf,B933AD,
  7X,MTA NYCT,7X,Flushing Express,"Trains operate between Main St-Flushing, Queens, and 11th Av-34th St, Manhattan, weekday mornings toward Manhattan. Weekday afternoons and evenings, these trains operate express to Queens.",1,http://web.mta.info/nyct/service/pdf/t7cur.pdf,B933AD,
  GS,MTA NYCT,S,42 St Shuttle,"Operates in Manhattan between Grand Central and Times Square. The shuttle provides a free transfer between 4, 5, 6, and 7 service at Grand Central-42 St and A, C, E, N, Q, R, W, 1, 2, 3, and 7 service at Times Square-42 St. The shuttle runs at all times except during late nights, from about 12 midnight to 6 AM.",1,http://web.mta.info/nyct/service/pdf/t0cur.pdf,6D6E71,
  A,MTA NYCT,A,8 Avenue Express,"Trains operate between Inwood-207 St, Manhattan and Far Rockaway-Mott Avenue, Queens at all times. Also from about 6 AM until about midnight, additional trains operate between Inwood-207 St and Lefferts Boulevard (trains typically alternate between Lefferts Blvd and Far Rockaway). During weekday morning rush hours, special trains, denoted in the schedule by a diamond symbol, operate from Rockaway Park-Beach 116 St, Queens, toward Manhattan. These trains make local stops between Rockaway Park and Broad Channel. Similarly, in the evening rush hour special trains leave Manhattan operating toward Rockaway Park-Beach 116 St, Queens.",1,http://web.mta.info/nyct/service/pdf/tacur.pdf,2850AD,FFFFFF
  B,MTA NYCT,B,6 Avenue Express,"Trains operate, weekdays only, between 145 St, Manhattan, and Brighton Beach, Brooklyn at all times except late nights. The route extends to Bedford Park Blvd, Bronx, during rush hours.",1,http://web.mta.info/nyct/service/pdf/tbcur.pdf,FF6319,
  C,MTA NYCT,C,8 Avenue Local,"Trains operate between 168 St, Manhattan, and Euclid Av, Brooklyn, daily from about 6 AM to 11 PM.",1,http://web.mta.info/nyct/service/pdf/tccur.pdf,2850AD,FFFFFF
  D,MTA NYCT,D,6 Avenue Express,"Trains operate, at all times, from 205 Street, Bronx, to Stillwell Avenue, Brooklyn via Central Park West and 6th Avenue in Manhattan, and via the Manhattan Bridge to and from Brooklyn. When in Brooklyn trains operate via 4th Avenue then through Bensonhurst to Coney Island. Trains typically operate local in the Bronx, express in Manhattan, and local in Brooklyn. But please note that Bronx rush hour trains operate express (peak direction ONLY), and Brooklyn trains operate express along the 4th Avenue segment (all times except late nights).",1,http://web.mta.info/nyct/service/pdf/tdcur.pdf,FF6319,
  E,MTA NYCT,E,8 Avenue Local,"Trains operate between Jamaica Center (Parsons/Archer), Queens, and World Trade Center, Manhattan, at all times.",1,http://web.mta.info/nyct/service/pdf/tecur.pdf,2850AD,FFFFFF
  F,MTA NYCT,F,Queens Blvd Express/ 6 Av Local,"Trains operate at all times between Jamaica, Queens, and Stillwell Av, Brooklyn via the 63 St Connector (serving 21 St-Queensbridge, Roosevelt Island, Lexington Av-63 St, and 57 St-6 Av). F trains operate express along Queens Blvd at all times. Trains do not serve Queens Plaza, 23 St-Ely Av, Lexington Av-53 St and 5 Av-53 St.",1,http://web.mta.info/nyct/service/pdf/tfcur.pdf,FF6319,
  FS,MTA NYCT,S,Franklin Avenue Shuttle,"Train provides full time connecting service between the A and C at the Franklin Av/Fulton St station, and the Q at the Prospect Park/Empire Blvd station. A free transfer is also available at the Botanic Garden/Eastern Parkway Station to the 2, 3, 4, and 5 service.",1,http://web.mta.info/nyct/service/pdf/tscur.pdf,,
  G,MTA NYCT,G,Brooklyn-Queens Crosstown,"Trains operate between Court Square, Queens and Church Av, Brooklyn weekdays, and all weekend. Weekday evenings and late nights, trains operate between Forest Hill-71 Av, Queens and Church Av, Brooklyn.",1,http://web.mta.info/nyct/service/pdf/tgcur.pdf,6CBE45,
  J,MTA NYCT,J,Nassau St Local,"Trains operate weekdays between Jamaica Center (Parsons/Archer), Queens, and Broad St, Manhattan. During weekdays, Trains going to Manhattan run express in Brooklyn between Myrtle Av and Marcy Av from about 7 AM to 1 PM and from Manhattan from 1:30 PM and 8 PM. During weekday rush hours, trains provide skip-stop service. Skip-stop service means that some stations are served by J trains, some stations are served by the Z trains, and some stations are served by both J and Z trains. J/Z skip-stop service runs towards Manhattan from about 7 AM to 8:15 AM and from Manhattan from about 4:30 PM to 5:45 PM.",1,http://web.mta.info/nyct/service/pdf/tjcur.pdf,996633,
  L,MTA NYCT,L,14 St-Canarsie Local,"Trains operate between 8 Av/14 St, Manhattan, and Rockaway Pkwy/Canarsie, Brooklyn, 24 hours daily.",1,http://web.mta.info/nyct/service/pdf/tlcur.pdf,A7A9AC,
  M,MTA NYCT,M,QNS BLVD-6th AVE/ Myrtle Local,"Trains operate between Middle Village-Metropolitan Avenue, Queens and Myrtle Avenue, Brooklyn at all times. Service is extended weekdays (except late nights) Continental Ave, Queens, All trains provide local service.",1,http://web.mta.info/nyct/service/pdf/tmcur.pdf,FF6319,
  N,MTA NYCT,N,Broadway Express,"Trains operate from Ditmars Boulevard, Queens, to Stillwell Avenue, Brooklyn, at all times. N trains in Manhattan operate along Broadway and across the Manhattan Bridge to and from Brooklyn. Trains in Brooklyn operate along 4th Avenue, then through Borough Park to Gravesend. Trains typically operate local in Queens, and either express or local in Manhattan and Brooklyn, depending on the time. Late night trains operate via Whitehall Street, Manhattan. Late night service is local.",1,http://web.mta.info/nyct/service/pdf/tncur.pdf,FCCC0A,
  Q,MTA NYCT,Q,Broadway Express,"Trains operate between Astoria, Queens, and Stillwell Av, Brooklyn except nights. During late nights trains will operate from 57th Street/7th Avenue, Manhattan, and Stillwell Av, Brooklyn. Trains operate express from 34th St. via Broadway to Canal Street, except late nights when trains operate express 34th to Canal(lower level), cross into Brooklyn via Manhattan Bridge, then operate local to and from Stillwell Av.",1,http://web.mta.info/nyct/service/pdf/tqcur.pdf,FCCC0A,
  R,MTA NYCT,R,Broadway Local,"Trains operate local between Forest Hills-71 Av, Queens, and 95 St/4 Av, Brooklyn, at all times except late nights. During late nights, trains operate only in Brooklyn between 36 St and 95 St/4 Av.",1,http://web.mta.info/nyct/service/pdf/trcur.pdf,FCCC0A,
  H,MTA NYCT,S,Rockaway Park Shuttle,"Service operates at all times between Broad Channel, and Rockaway Park, Queens.",1,http://web.mta.info/nyct/service/pdf/thcur.pdf,,
  Z,MTA NYCT,Z,Nassau St Express,"During weekday rush hours, J and Z trains provide skip-stop service. Skip-stop service means that some stations are served by J trains, some stations are served by the Z trains, and some stations are served by both J and Z trains. J/Z skip-stop service runs towards Manhattan from about 7 AM to 8:15 AM and from Manhattan from about 4:30 PM to 5:45 PM.",1,http://web.mta.info/nyct/service/pdf/tjcur.pdf,996633,
  SI,MTA NYCT,SIR,Staten Island Railway,"Service runs 24 hours a day between the St George and Tottenville terminals. At the St George terminal, customers can make connections with Staten Island Ferry service to Manhattan.",2,http://web.mta.info/nyct/service/pdf/sircur.pdf,,
  `;
  return routes;

};