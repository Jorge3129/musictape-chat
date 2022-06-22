import axios from 'axios'
import {AuthService} from "../constants/api";


class PublicKeyService {
    // private publicKey?: string;
    //
    // public async getKey(): Promise<string> {
    //     try {
    //         if (!this.publicKey) {
    //             console.log(AuthService.PUBLIC_KEY)
    //             const res = await axios.get<string>(AuthService.PUBLIC_KEY)
    //             this.publicKey = res.data;
    //         }
    //         return this.publicKey
    //     } catch (e: any) {
    //         console.log(e.message)
    //         return ""
    //     }
    // }

    public getKey(): string {
        return `-----BEGIN PUBLIC KEY-----
MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAuscbTpxg540g/sN7KYbb
z1CcXaYni2whorUxAXJana/7lOpq90p9oSQBii/E5V8wGE3CkULXQEjGz77AZhuB
0/fDSc4ALj4gRk4SKRlLO/LORW95N9Gu2xVVqduW7WG7Q1lIO2WVpI7mY0cN0Q+q
n85XLwgwshWZ33SY0TQNq2H3IFuoZ6H/ZISBpJfMO+qRs88p60LM6M/WMFUcFtuT
E8hQToXjM3Lrp0Xj8eVOeYIClqKAsVzIDjhCzEJmdUh6ly4G18nmy2TcgsDDzjXs
8QXnIIlkcNLxhcAvHtp2zoc9TQp45XBcBhVPmfLzCuIf1FpMKp0pn9N47HLRLSCR
1uDvSBTT9LIqlv2jpzay97k9sYaYyNBgLBJQ5uk25/Cfh5dFRioIB3rc4Jdp52kE
dNl2ZzZkv1bRbCy6h6+MWtASQ+lfPmtWwl6oRLz6P/L4IzortQqQBZcOhgiJq12w
vODEO0F7qGKeMxLZO/V/yp0He/up/d6ztIu7w/Rfe3qpAgMBAAE=
-----END PUBLIC KEY-----`
    }
}

export default new PublicKeyService()
