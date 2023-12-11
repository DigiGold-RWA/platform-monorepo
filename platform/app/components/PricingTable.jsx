import React from "react";

const PricingTable = () => {
    return (
        <>
            <div className="pricing-table-container w-full rounded-[24px] overflow-x-auto md:overflow-x-auto">
                <table className="w-full min-w-full leading-normal table-auto overflow-x-auto relative order-table">
                    <thead>
                        <tr className="whitespace-nowrap">
                            <th></th>
                            <th className="gold">DGold</th>
                            <th>Major Gold ETFS</th>
                            <th>Gold Futures</th>
                            <th>Unallocated Gold</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#D0D0D0]">
                        <tr>
                            <td>Custody fees</td>
                            <td className="gold">No Fee</td>
                            <td>19-40 bps per annum</td>
                            <td>N/A</td>
                            <td>0-10 bps per annum</td>
                        </tr>
                        <tr>
                            <td>Minimum Purchase</td>
                            <td className="gold">0.5g ~ $32</td>
                            <td>1 share (currently $200)</td>
                            <td>1 contract (100t oz = ~$200k)</td>
                            <td>Variable</td>
                        </tr>
                        <tr>
                            <td>Time to settle</td>
                            <td className="gold">Instant</td>
                            <td>T + 2 days</td>
                            <td>Expiration date</td>
                            <td>T + 2</td>
                        </tr>
                        <tr>
                            <td>Allocated</td>
                            <td className="gold">✓</td>
                            <td>Variable</td>
                            <td>x</td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td>Instantly Redeemable for Physical</td>
                            <td className="gold">✓</td>
                            <td>x</td>
                            <td>x</td>
                            <td>x</td>
                        </tr>
                        <tr>
                            <td>Regulated</td>
                            <td className="gold">VASP Licenses</td>
                            <td>SEC & equivalents</td>
                            <td>CFTC</td>
                            <td>x</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PricingTable;
