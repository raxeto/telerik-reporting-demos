import React from 'react';

export class ReportParams {
    static getMap(): Map<string, { reportFile: string, paramValues: {} }> {
        const reportParams = new Map();

        reportParams.set("Crypto Dashboard", { reportFile: "Crypto Report.trdx", paramValues: {} });
        reportParams.set("Conference Report", { reportFile: "Conference Report.trdx", paramValues: {} });
        reportParams.set("Dashboard", { reportFile: "Dashboard.trdx", paramValues: { ReportYear: 2001 } });
        reportParams.set("Crypto Currency Info", {
            reportFile: "CryptoCurrencyInfo.trdx",
            paramValues: {
                currencyCode: "btc",
                fromDate: "2022-05-06T00:00:00.000Z",
                toDate: "2023-05-06T00:00:00.000Z"
            }
        });
        reportParams.set("Invoice", {
            reportFile: "Invoice.trdx",
            paramValues: {
                OrderNumber: "SO51081",
                ForYear: 2003,
                ForMonth: 7
            }
        });
        reportParams.set("Swiss QR Bill Report", { reportFile: "SwissQRBill.trdx", paramValues: {} });
        reportParams.set("Barcodes Report", { reportFile: "Barcodes Report.trdx", paramValues: {} });
        reportParams.set("Product Sales", { reportFile: "Product Sales.trdx", paramValues: {} });
        reportParams.set("Employee Sales", {
            reportFile: "Employee Sales Summary.trdx",
            paramValues: {
                ReportDate: "2003-07-01T00:00:00.000Z",
                Employee: 283
            }
        });
        reportParams.set("Product Line Sales", {
            reportFile: "Product Line Sales.trdx",
            paramValues: {
                ProductCategory: "Bikes",
                ProductSubcategory: [
                    "Mountain Bikes"
                ],
                FromDate: "2001-01-01T00:00:00.000Z",
                ToDate: "2004-12-31T00:00:00.000Z"
            }
        });
        reportParams.set("Sales Dashboard", {
            reportFile: "SalesByRegionDashboard.trdx",
            paramValues: {
                year: [2003, 2004],
                country: ["United States", "Canada"],
                category: "1",
                topN: 12
            }
        });
        reportParams.set("Report Book", {
            reportFile: "ReportBook.trbp",
            paramValues: {
                year: [2003, 2004],
                country: ["United States", "Canada"],
                category: "1",
                topN: 12,
                ReportYear: 2001,
                CultureID: "en",
                ProductCategory: "Bikes",
                ProductSubcategory: ["Mountain Bikes"],
                "FromDate": "2001-01-01T00:00:00.000Z",
                "ToDate": "2004-12-31T00:00:00.000Z"
            }
        });
        reportParams.set("Crypto Currencies", {
            reportFile: "CryptoCurrencies.trdx",
            paramValues: {
                date: "2023-05-05T00:00:00.000Z"
            }
        });
        reportParams.set("List Bound Report", { reportFile: "ListBoundReport.trdx", paramValues: {} });
        reportParams.set("Product Catalog", {
            reportFile: "Product Catalog.trdx",
            paramValues: {
                CultureID: "en"
            }
        });
        reportParams.set("Product Tag Report", { reportFile: "Product Tag Report.trdx", paramValues: {} });
        reportParams.set("Olympic Medals Map", {
            reportFile: "OlympicMedalsByNationalTeams.trdx",
            paramValues: {
                associationParam: ["1"],
                teamParam: "United States"
            }
        });
        reportParams.set("Population Density", { reportFile: "PopulationDensity.trdx", paramValues: {} });

        return reportParams
    }
}