import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { config } from '../../middleware';
import { ConfirmContextProps } from "@/types";

export default function Confirm({config}:{config: ConfirmContextProps}) {

    const dialogFooter = config?.handlerAction ? (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={config.hideDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={config.handlerAction} />
        </>
    ) : false;

    function message() {
        return {__html: `${config.message}<br/><b>${config.strong}</b>`};
    }
    function strong() {
        return {__html: `<br/><br/><br/><br/><b>${config.strong}</b>`};
    }

  return (
    <Dialog   visible={config.visible}  style={{ width: config?.width ?? '450px' }} header={config.title} modal onHide={config.hideDialog} footer={dialogFooter}>
                <div className="flex align-items-start justify-content-start">
                    {config.symbol && (
                        <i className={config.symbol} style={{ fontSize: '2rem' }} />
                    )}
                    <span dangerouslySetInnerHTML={message()} />
                </div>
    </Dialog>
  )
}
