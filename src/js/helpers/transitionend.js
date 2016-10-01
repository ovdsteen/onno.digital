class transitionend {

    constructor(classname){

        this.transitionEvent = this.whichTransitionEvent();
        this.el = document.getElementsByClassName(classname)[0];

    }

    watch(event,cb){
        this.transitionEvent && this.el.addEventListener(this.transitionEvent, function(e) {
            console.log('propertyName',e.propertyName);
            if (e.propertyName === event){
                return cb(false);
            }
            return cb(true);
        });
    }

    whichTransitionEvent(){
        let t;
        const el = document.createElement('fakeelement');
        const transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

}

export default transitionend
