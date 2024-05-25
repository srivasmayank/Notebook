//mongodb+srv://mayansrivas:<password>@merndatabase.jufmvlb.mongodb.net/
import {connect} from "mongoose";

const connectToMongo= async ()=>{
    try {
        await connect('mongodb+srv://mayansrivas:Mayavi2825@merndatabase.jufmvlb.mongodb.net/eNotebook');
        console.log("CONNECTED");
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongo;