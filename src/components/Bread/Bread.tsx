import { BreadCrumb } from "primereact/breadcrumb";

export default function Bread({model}:{model: any}) {

  return (
    <BreadCrumb className={'my-breadcrumb'} home={{ icon: 'pi pi-home', url: '/home' }} model={model} />
  )
}
