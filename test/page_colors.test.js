import { page_colors } from '../src/page_colors.js'
import { expect } from './utils.js'

describe('page_colors object', function () {
  it('have the desired properties', function () {
    expect(page_colors).to.have.property('chart_colors')
    expect(page_colors).to.have.property('line_color')
    expect(page_colors).to.have.property('background_color')
    expect(page_colors).to.have.property('primary_text_color')
    expect(page_colors).to.have.property('secondary_text_color')
    expect(page_colors).to.have.property('primary_color')
    expect(page_colors).to.have.property('secondary_color')
    expect(page_colors).to.have.property('traffic_light_colors')
  })
})