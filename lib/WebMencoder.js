function EventEmitter() {
  let _handlers = {};

  this.on = function(event, handler) {
    _handlers[event] = handler;
  };

  this.emit = function(event) {
    let handler = _handlers[event];
    if (handler) {
      handler.apply(null, Array.prototype.slice.call(arguments, 1));
    }
  };
}

class WebMencoder extends EventEmitter {
  
  constructor(settings) {
    super();

    settings = settings || {};
    this.framerate = settings.framerate || 60;
    this.frameLimit = settings.frameLimit;
    
    this.type = 'video/webm';
    this.extension = '.webm';
    this._init();
  }

  static isSupported() {
    return (typeof MediaRecorder !== undefined);
  }
  
  _init() {
    this.chunks = [];
    this.mediaRecorder = null;
    this.stream = null;
    this.isRecording = false;
    this.frameCount = 0;
  }
  
  start() {
    this.isRecording = true;
  }
  
  stop() {
    this.isRecording = false;
  }

  addFrame( canvas ) {  
    if (!this.isRecording) return;

    if( !this.stream ) {
      this.stream = canvas.captureStream( this.framerate );
      this.mediaRecorder = new MediaRecorder( this.stream );
      this.mediaRecorder.start();

      this.mediaRecorder.ondataavailable = function(e) {
        this.chunks.push(e.data);
      }.bind( this );

    }
    this.frameCount++;
    
    if (this.frameCount >= this.frameLimit) {
      this.stop();
      this.emit("stopped")
    }

  }
  
  save( callback ) {

    this.mediaRecorder.onstop = function( e ) {
      let blob = new Blob( this.chunks, { 'type' : this.type });
      this._init();
      callback( blob );
    }.bind( this );

    this.mediaRecorder.stop();
    


  }

}
