import { BlockUI } from "primereact/blockui";

   export default function Loading() {
   
     return (
        <BlockUI blocked={true}  fullScreen template={<i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>} />
   
     )
   }
   