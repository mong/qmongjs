import { selectAll, select } from 'd3'

export const color_legend_line_chart = function (selection, props) {
  const {
    line_color_scale,
    margin = { left: 0.1, right: 0.1 },
    inner_width,
    legend_text_fill,
    legend_text_font_family,
    legend_text_font_size = 7 + inner_width * 0.01
  } = props

  const primary_legend_group = selection
    .selectAll('.line_chart_legend_table')
    .data([null])
  const legend_container = primary_legend_group
    .enter()
    .append('div')
    .merge(primary_legend_group)
    .attr('class', 'line_chart_legend_table')
    .style('position', 'relative')
    .style('top', '0')
    .style('left', `${margin.left * 100}%`)
    .style('width', `${(1 - margin.left - margin.right) * 100}%`)
  const legend_list = legend_container
    .selectAll('ul')
    .data([null])
    .enter()
    .append('ul')
    .merge(legend_container)
    .style('display', 'flex')
    .style('justify-content', 'flex-start')
    .style('flex-wrap', 'wrap')
  const legend = legend_list.selectAll('li').data(line_color_scale.domain())

  const legend_item = legend
    .enter()
    .append('li')
    .style('display', 'inline-block')
    .style('margin', '5px')
    .style('display', 'flex')
    .attr('class', 'legend_item')

  legend.exit().remove()

  legend_item
    .merge(legend)
    .on('mouseover', function (d) {
      selectAll('svg path.table-line-chart:not(.clicked)')
        .transition()
        .duration(500)
        .style('opacity', 0.2)
      select(`svg path.${d.replace(/\s/g, '')}`)
        .transition()
        .duration(500)
        .style('opacity', 1)
      select(this).style('cursor', 'pointer')
    })
    .on('mouseout', function (d) {
      var nr_clicked = select('.responsive_svg').selectAll('li.clicked').nodes()
        .length
      if (nr_clicked < 1) {
        selectAll('path.table-line-chart:not(.clicked)')
          .transition()
          .duration(500)
          .style('opacity', 1)
      } else {
        selectAll('path.table-line-chart:not(.clicked)')
          .transition()
          .duration(500)
          .style('opacity', 0.2)
      }
    })
    .on('click', function (d) {
      var clicked_legend = select(this).attr('class')
      if (clicked_legend.includes('clicked')) {
        var nr_clicked = select('.responsive_svg')
          .selectAll('li.clicked')
          .nodes().length
        var selected_path_class
        if (nr_clicked === 1) {
          selected_path_class = select(`svg path.${d.replace(/\s/g, '')}`).attr(
            'class'
          )
          selected_path_class = selected_path_class.replace(' clicked', '')
          clicked_legend = clicked_legend.replace(' clicked', '')
          selectAll('svg path.table-line-chart')
            .attr(
              'class',
              (d) => `table-line-chart  ${d.key.replace(/\s/g, '')}`
            )
            .transition()
            .duration(1000)
            .style('opacity', 1)
          selectAll('.responsive_svg li.legend_item')
            .attr('class', clicked_legend)
            .transition()
            .duration(500)
            .style('opacity', 1)
        } else if (nr_clicked > 1) {
          selected_path_class = select(`svg path.${d.replace(/\s/g, '')}`).attr(
            'class'
          )
          selected_path_class = selected_path_class.replace(' clicked', '')
          clicked_legend = clicked_legend.replace(' clicked', '')
          select(`svg path.${d.replace(/\s/g, '')}`)
            .attr('class', selected_path_class)
            .transition()
            .duration(1000)
            .style('opacity', '0.2')
          select(this)
            .attr('class', clicked_legend)
            .transition()
            .duration(500)
            .style('opacity', 0.4)
        } else {
          selected_path_class = select(`svg path.${d.replace(/\s/g, '')}`).attr(
            'class'
          )
          selected_path_class = selected_path_class.replace(' clicked', '')
          clicked_legend = clicked_legend.replace(' clicked', '')
          select('svg path.table-line-chart')
            .attr('class', selected_path_class)
            .transition()
            .duration(1000)
            .style('opacity', 1)
          select('.responsive_svg li.legend_item')
            .attr('class', clicked_legend)
            .transition()
            .duration(500)
            .style('opacity', 1)
        }
      } else {
        nr_clicked = select('.responsive_svg').selectAll('li.clicked').nodes()
          .length
        if (nr_clicked === 0) {
          selected_path_class = select(`svg path.${d.replace(/\s/g, '')}`).attr(
            'class'
          )
          selected_path_class = `${selected_path_class} clicked`
          clicked_legend = `${clicked_legend} clicked`
          select(`svg path.${d.replace(/\s/g, '')}`)
            .attr('class', selected_path_class)
            .style('opacity', 1)
          select(this).attr('class', clicked_legend).style('opacity', 1)
          selectAll('svg path.table-line-chart:not(.clicked)')
            .transition()
            .duration(500)
            .style('opacity', 0.2)
          selectAll('.responsive_svg li.legend_item:not(.clicked)')
            .transition()
            .duration(500)
            .style('opacity', 0.4)
        } else if (nr_clicked > 0) {
          selected_path_class = select(`svg path.${d.replace(/\s/g, '')}`).attr(
            'class'
          )
          selected_path_class = `${selected_path_class} clicked`
          clicked_legend = `${clicked_legend} clicked`
          select(`svg path.${d.replace(/\s/g, '')}`)
            .attr('class', selected_path_class)
            .style('opacity', 1)
          select(this).attr('class', clicked_legend).style('opacity', 1)
        }
      }
    })
  legend_item
    .append('text')
    .merge(legend.select('text'))
    .text((d) => d)
    .style('font-size', legend_text_font_size + 'px')
    .style('font-family', legend_text_font_family)
    .style('fill', legend_text_fill)
    .style('padding', '5px')
    .style('border-bottom', (d) => `3px solid ${line_color_scale(d)}`)
}
