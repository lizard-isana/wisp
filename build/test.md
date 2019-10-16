# TEST

## Footnote

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

## Highlight

```javascript
Willo.QueryDecoder = function () {
  var query = [];
  var search = decodeURIComponent(location.search);
  var q = search.replace(/^\?/, '&').split("&");
  for (var i = 1, l = q.length; i < l; i++) {
    var tmp_array = q[i].split("=");
    var name = tmp_array[0];
    var value = tmp_array[1];
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }
    query[name] = value;
  }
  return query;
}
```

## Math

#### ケプラーの第1法則:
$$ r = \frac{a^2/b}{1 + \epsilon \cos \theta} \tag{1}$$
\\( a \\)は軌道長半径、\\( b \\)は軌道短半径、\\( \epsilon \\)は離心率、\\(\theta\\)は真近点角  

#### ケプラーの第2法則:
$$ \frac{1}{2} r^2 \frac{d\theta}{dt} = \frac{dA}{dt} \tag{2}$$

#### ケプラーの第3法則:
$$ \frac{T^2}{a^3} = constant \tag{3}$$

#### ケプラー方程式:
$$ M = E-\epsilon \sin E \tag{4}$$

## Chart

```chart
{
    "data": {
    "columns": [
        ["data1", 30, 200, 100, 400, 150, 250],
        ["data2", 50, 20, 10, 40, 15, 25]
    ]
    }
}
```

