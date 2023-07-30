//祖先から指定data属性を持つ要素を取得するメソッドを作成
if(!Element.prototype.ag2closest){
    Element.prototype.ag2closest = function(d){
      let _el = this;
      do{
        if(_el.dataset[d] !== undefined) return _el;
        _el = _el.parentElement || _el.parentNode;
      }while(_el !== null && _el.nodeType === 1);
      return null;
    };
  }
  //指定ノードを子要素に持つか確認するメソッドを作成
  if(!Node.prototype.ag2contains){
    Node.prototype.ag2contains = function(n){
      while(n !== null){
        if(n === this) return true;
        n = n.parentElement || n.parentNode;
      }
      return false;
    };
  }
  
  //初期設定値
  const ag2videoSettings = {
    dataName: 'ag2video', //親要素に付与してあるdata属性名
    classActive: 'ag2videoOn', //マウスオンで付与するクラス名
  };
  //現在再生中のvideo要素を保持する変数
  let currentVideo = null;
  const ag2video = {
    on: function(t){
      //クラスを付与
      t.classList.add(ag2videoSettings.classActive);
      //現在のvideo要素を代入して保持
      currentVideo = t.querySelector('video');
  
      //頭に戻す場合
      // currentVideo.currentTime = 0;
      //再生
      currentVideo.play();
  
      currentVideo.addEventListener('timeupdate', function(){
        ag2video.progerss(t);
      });
    },
    off: function(t){
      //停止
      currentVideo.pause();
      //posterを再表示させる場合(リロード)
      // currentVideo.load();
  
      currentVideo.removeEventListener('timeupdate', function(){
        ag2video.progerss(t);
      });
  
      //クラスを削除
      t.classList.remove(ag2videoSettings.classActive);
      currentVideo = null;
    },
    progerss: function(t){ //プログレスバー
      if(t.classList.contains(ag2videoSettings.classActive)) return;
    }
  };
  
  document.addEventListener('mouseover', function(){
    //ターゲット(またはその親要素)が「data-ag2video」属性を持っていて、かつ現表示の要素ではない場合
    let videoTarget = event.target.ag2closest(ag2videoSettings.dataName);
    if(videoTarget && videoTarget !== currentVideo){
      ag2video.on(videoTarget);
    }
  });
  document.addEventListener('mouseout', function(){
    //再生中の場合
    if(currentVideo){
      //移動先がブラウザウィンドウ外ではなく、かつ以下のどちらかの場合はreturn
      //移動元が現表示の親要素、かつ移動先がその子要素の場合
      //移動元が現表示の親要素の子要素、かつ移動先が現表示の親要素(またはその子要素)の場合
      if( event.relatedTarget && ((event.target === currentVideo && event.target.ag2contains(event.relatedTarget)) || (currentVideo.ag2contains(event.target) && currentVideo === event.relatedTarget.ag2closest(ag2videoSettings.dataName))) ) return;
  
      let videoTarget = event.target.ag2closest(ag2videoSettings.dataName);
      ag2video.off(videoTarget);
    }
  });