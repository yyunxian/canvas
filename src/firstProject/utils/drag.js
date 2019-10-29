
 class Draw {
  constructor(){

    this.c = document.getElementById('canvas');
    this.ctx = this.c.getContext('2d');

    this.mouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;

    this.tempHistory = [];

    this.setSize();

    this.listen();

    this.redraw();
  }

  listen(){
    this.c.addEventListener('mousedown', (e)=>{
      this.mouseDown = true;
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      this.setDummyPoint();
    });

    this.c.addEventListener('mouseup', ()=>{
      if(this.mouseDown){
        this.setDummyPoint();
      }
      this.mouseDown = false;
    });

    this.c.addEventListener('mouseleave', ()=>{
      if(this.mouseDown){
        this.setDummyPoint();
      }
      this.mouseDown = false;
    });

    this.c.addEventListener('mousemove', (e)=>{
      this.moveMouse(e);

      if(this.mouseDown){
        this.mouseX = this.mouseX;
        this.mouseY = this.mouseY;

        if(!app.options.restrictX){
          this.mouseX = e.offsetX;
        }

        if(!app.options.restrictY){
          this.mouseY = e.offsetY;
        }

        var item = {
          isDummy: false,
          x: this.mouseX,
          y: this.mouseY,
          c: app.color,
          r: app.size
        };

        app.history.push(item);
        this.draw(item, app.history.length);
      }
    });

    window.addEventListener('resize', ()=>{
      this.setSize();
      this.redraw();
    });
  }

  setSize(){
    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight - 60;
  }

  moveMouse(e){
    let x = e.offsetX;
    let y = e.offsetY;

    var cursor = document.getElementById('cursor');

    cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
  }

  getDummyItem(){
    var lastPoint = app.history[app.history.length-1];

    return {
      isDummy: true,
      x: lastPoint.x,
      y: lastPoint.y,
      c: null,
      r: null
    };
  }

  setDummyPoint(){
    var item = this.getDummyItem();
    app.history.push(item);
    this.draw(item, app.history.length);
  }

  redraw(){
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.drawBgDots();

    if(!app.history.length){
      return true;
    }

    app.history.forEach((item, i)=>{
      this.draw(item, i);
    });
  }

  drawBgDots(){
    var gridSize = 50;
    this.ctx.fillStyle = 'rgba(0, 0, 0, .2)';

    for(var i = 0; i*gridSize < this.c.width; i++){
      for(var j = 0; j*gridSize < this.c.height; j++){
        if(i > 0 && j > 0){
          this.ctx.beginPath();
          this.ctx.rect(i * gridSize, j * gridSize, 2, 2);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  draw(item, i){
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin="round";

    var prevItem = app.history[i-2];

    if(i < 2){
      return false;
    }

    if(!item.isDummy && !app.history[i-1].isDummy && !prevItem.isDummy){
      this.ctx.strokeStyle = item.c;
      this.ctx.lineWidth = item.r;

      this.ctx.beginPath();
      this.ctx.moveTo(prevItem.x, prevItem.y);
      this.ctx.lineTo(item.x, item.y);
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (!item.isDummy) {
      this.ctx.strokeStyle = item.c;
      this.ctx.lineWidth = item.r;

      this.ctx.beginPath();
      this.ctx.moveTo(item.x, item.y);
      this.ctx.lineTo(item.x, item.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}
