interface REG {
    [key: string]: {
        "region": string;
        "countries": {
            [key: string]: string;
        };
    };
}
declare const regions: REG;
export default regions;
