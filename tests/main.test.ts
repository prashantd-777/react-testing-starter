import { it, expect, describe } from 'vitest';
import {faker} from "@faker-js/faker";

describe('group', () => {
    it('should', async () => {
        const res = await fetch('/categories');
        const data = await res.json();
        console.log('data is::', data);
        expect(data).toHaveLength(3);
    });

    it('should get faker JS data', () => {
        console.log({
            name: faker.commerce.productName(),
            price: faker.commerce.price({min: 1, max: 100})
        })   
    });
})