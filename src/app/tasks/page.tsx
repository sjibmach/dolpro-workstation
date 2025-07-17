import React from 'react';
import { DataTable } from './data-table';
import { data } from './data';

const ClientPage = () => {
    return (
        <div className="container mx-auto py-10">
            <DataTable data={data} />
        </div>
    );
};

export default ClientPage;
