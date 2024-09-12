const express = require('express')
const router = express.Router();
const Countriescontroller = require('../controllers/countries.controller');





/**
 * @swagger
 * /api/alpha/{code}:
 *   get:
 *     tags:
 *       - countries
 *     summary: Get country details by code
 *     parameters:
 *       - name: code
 *         in: path
 *         description: Country code (e.g., "US" for the United States)
 *         required: true
 *         schema:
 *           type: string
 *         example: US
 *     responses:
 *       '200':
 *         description: Successful response with country details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: United States
 *                 flag:
 *                   type: string
 *                   example: https://flagcdn.com/us.svg
 *                 population:
 *                   type: string
 *                   example: 331,002,651
 *                 capital:
 *                   type: string
 *                   example: Washington, D.C.
 *                 region:
 *                   type: string
 *                   example: Americas
 *                 subregion:
 *                   type: string
 *                   example: Northern America
 *                 languages:
 *                   type: string
 *                   example: English, Spanish
 *       '404':
 *         description: Country not found
 *       '500':
 *         description: Internal Server Error
 */

router.get('/alpha/:code', Countriescontroller.getCountryDetails);


/**
 * @swagger
 * /api/all:
 *   get:
 *     tags:
 *       - countries
 *     summary: 'Get all countries with search and pagination'
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search countries by name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of countries per page
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Authorization Failure
 *       '422':
 *         description: Validation Error
 *       '500':
 *         description: Internal Server Error
 */
router.get('/all', Countriescontroller.searchCountries);



module.exports = router
