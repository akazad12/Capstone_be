export function globalErr(err,_req,res,_next){
    res.status(err.status || 500).json({ error: `Error: ${message}`});
}
