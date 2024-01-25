'use client';
import React, { useState, useEffect } from 'react';
import { Tree, TreeCheckboxSelectionKeys, TreeMultipleSelectionKeys } from 'primereact/tree';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
//OLDD import { NodeService } from '../../../../demo/service/NodeService';
import { TreeNode } from 'primereact/treenode';

const TreeDemo = () => {
    const [files, setFiles] = useState<TreeNode[]>([]);
    const [files2, setFiles2] = useState<TreeNode[]>([]);
    const [selectedFileKeys, setSelectedFileKeys] = useState<string | TreeMultipleSelectionKeys | TreeCheckboxSelectionKeys | null>(null);
    const [selectedFileKeys2, setSelectedFileKeys2] = useState<TreeTableSelectionKeysType | null>(null);

    useEffect(() => {
        //OLDD NodeService.getFiles().then((files) => setFiles(files));
        //NEW
       const myFiles = [{
            "key": "0",
            "label": "Documents",
            "data": "Documents Folder",
            "icon": "pi pi-fw pi-inbox",
            "children": [{
                "key": "0-0",
                "label": "Work",
                "data": "Work Folder",
                "icon": "pi pi-fw pi-cog",
                "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
            },
            {
                "key": "0-1",
                "label": "Home",
                "data": "Home Folder",
                "icon": "pi pi-fw pi-home",
                "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
            }]
        },
        {
            "key": "1",
            "label": "Events",
            "data": "Events Folder",
            "icon": "pi pi-fw pi-calendar",
            "children": [
                { "key": "1-0", "label": "Meeting", "icon": "pi pi-fw pi-calendar-plus", "data": "Meeting" },
                { "key": "1-1", "label": "Product Launch", "icon": "pi pi-fw pi-calendar-plus", "data": "Product Launch" },
                { "key": "1-2", "label": "Report Review", "icon": "pi pi-fw pi-calendar-plus", "data": "Report Review" }]
        },
        {
            "key": "2",
            "label": "Movies",
            "data": "Movies Folder",
            "icon": "pi pi-fw pi-star",
            "children": [{
                "key": "2-0",
                "icon": "pi pi-fw pi-star",
                "label": "Al Pacino",
                "data": "Pacino Movies",
                "children": [{ "key": "2-0-0", "label": "Scarface", "icon": "pi pi-fw pi-video", "data": "Scarface Movie" }, { "key": "2-0-1", "label": "Serpico", "icon": "pi pi-fw pi-video", "data": "Serpico Movie" }]
            },
            {
                "key": "2-1",
                "label": "Robert De Niro",
                "icon": "pi pi-fw pi-star",
                "data": "De Niro Movies",
                "children": [{ "key": "2-1-0", "label": "Goodfellas", "icon": "pi pi-fw pi-video", "data": "Goodfellas Movie" }, { "key": "2-1-1", "label": "Untouchables", "icon": "pi pi-fw pi-video", "data": "Untouchables Movie" }]
            }]
        }];
        setFiles(myFiles);

         //OLDD NodeService.getFilesystem().then((files) => setFiles2(files));
         //NEW
        const myFiles2 = [
            {
                "key": "0",
                "data":{  
                    "name":"Applications",
                    "size":"100kb",
                    "type":"Folder"
                },
                "children":[  
                    {  
                        "key": "0-0",
                        "data":{
                            "name":"React",
                            "size":"25kb",
                            "type":"Folder"
                        },
                        "children":[  
                            {  
                                "key": "0-0-0",
                                "data":{  
                                    "name":"react.app",
                                    "size":"10kb",
                                    "type":"Application"
                                }
                            },
                            {  
                                "key": "0-0-1",
                                "data":{  
                                    "name":"native.app",
                                    "size":"10kb",
                                    "type":"Application"
                                }
                            },
                            {  
                                "key": "0-0-2",
                                "data":{  
                                    "name":"mobile.app",
                                    "size":"5kb",
                                    "type":"Application"
                                }
                            }
                        ]
                    },
                    {  
                        "key": "0-1",
                        "data":{  
                            "name":"editor.app",
                            "size":"25kb",
                            "type":"Application"
                        }
                    },
                    {  
                        "key": "0-2",
                        "data":{  
                            "name":"settings.app",
                            "size":"50kb",
                            "type":"Application"
                        }
                    }
                ]
            },
            {  
                "key": "1",
                "data":{  
                    "name":"Cloud",
                    "size":"20kb",
                    "type":"Folder"
                },
                "children":[  
                    {  
                        "key": "1-0",
                        "data":{  
                            "name":"backup-1.zip",
                            "size":"10kb",
                            "type":"Zip"
                        }
                    },
                    {  
                        "key": "1-1",
                        "data":{  
                            "name":"backup-2.zip",
                            "size":"10kb",
                            "type":"Zip"
                        }
                    }
                ]
            }
        ];
        setFiles2(myFiles2);

       
    }, []);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Tree</h5>
                    <Tree value={files} selectionMode="checkbox" selectionKeys={selectedFileKeys} onSelectionChange={(e) => setSelectedFileKeys(e.value)} />
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>TreeTable</h5>
                    <TreeTable value={files2} selectionMode="checkbox" selectionKeys={selectedFileKeys2} onSelectionChange={(e) => setSelectedFileKeys2(e.value)}>
                        <Column field="name" header="Name" expander />
                        <Column field="size" header="Size" />
                        <Column field="type" header="Type" />
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default TreeDemo;
