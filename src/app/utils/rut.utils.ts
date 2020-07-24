
export class RutUtils {
    constructor(){}

    public validate(fullRut : string) : boolean {
        const regex = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
		if (!regex.test( fullRut )){
            return false;
        }
		let rutParts = fullRut.split('-');
		let vd = rutParts[1]; 
		let rutBody = rutParts[0];
        if ( vd === 'k' ) {
            vd = 'K' ;
        }
		return (this.getVd(rutBody) == vd );
	}
	public getVd (rutBody: string) : string{
        let rut = parseInt(rutBody);
        let sum = 0;
        let multiplier = 1;
        while (rut != 0)
        {
            multiplier++;
            if (multiplier == 8){
                multiplier = 2;
            }
            
            sum += (rut % 10) * multiplier;
            rut = Math.floor(rut / 10);
        }
        sum = 11 - (sum % 11);
        if (sum == 11)
        {
            return "0";
        }
        else if (sum == 10)
        {
            return "K";
        }
        else
        {
            return sum.toString();
        }
    }
}