
var rework = require('..')
  , fs = require('fs')
  , read = fs.readFileSync;

function fixture(name) {
  return read('test/fixtures/' + name + '.css', 'utf8');
}

var vendors = ['-webkit-', '-moz-'];

describe('rework', function(){
  describe('.prefixValue(value)', function(){
    it('should prefix the value', function(){
      rework(fixture('prefix-value'))
        .use(rework.prefixValue('transform', vendors))
        .toString()
        .should.equal(fixture('prefix-value.out'));
    })

    it('should utilize .vendors()', function(){
      rework(fixture('prefix-value'))
        .vendors(vendors)
        .use(rework.prefixValue('transform'))
        .toString()
        .should.equal(fixture('prefix-value.out'));
    })
  })

  describe('.at2x()', function(){
    it('should prefix "transform"', function(){
      rework(fixture('at2x'))
        .use(rework.at2x(vendors))
        .toString()
        .should.equal(fixture('at2x.out'));
    })
  })

  describe('.prefix(prop)', function(){
    it('should prefix prop', function(){
      rework(fixture('prefix'))
        .vendors(vendors)
        .use(rework.prefix('border-radius'))
        .use(rework.prefix('box-shadow'))
        .toString()
        .should.equal(fixture('prefix.out'));
    })
  })

  describe('.opacity()', function(){
    it('should add ie crap', function(){
      rework(fixture('opacity'))
        .vendors(vendors)
        .use(rework.opacity())
        .toString()
        .should.equal(fixture('opacity.out'));
    })
  })

  describe('.keyframes()', function(){
    it('should prefix keyframes', function(){
      rework(fixture('keyframes'))
        .vendors(vendors)
        .use(rework.keyframes())
        .use(rework.opacity())
        .use(rework.prefix('border-radius'))
        .toString()
        .should.equal(fixture('keyframes.out'));
    })
  })
})
