import React, { useEffect, useState } from 'react';
import { Modal, Space, Input, Row, Col } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
// image
import Bird from '../../asset/image/bird.jpg';
import DrippingWatter from '../../asset/image/dripping_watter.jpg';
import HeavingRain from '../../asset/image/heaving_rain.jpg';
import Lightning from '../../asset/image/lightning.jpg';
import Mountain from '../../asset/image/mountain.jpg';
import Rain from '../../asset/image/rain.jpg';
import River from '../../asset/image/river.jpg';
import WindBell from '../../asset/image/wind_bell.jpg';
import Wind from '../../asset/image/wind.jpg';
import Night from '../../asset/image/sound_night.jpg';
import Frog from '../../asset/image/sound_frog.jpg';
import Bobbles_watter_cave from '../../asset/image/bubbles_watter_cave.jpg';
// sound
import BirdSound from '../../asset/sound/bird.mp3';
import DrippingWatterSound from '../../asset/sound/dripping_water.mp3';
import HeavingRainSound from '../../asset/sound/heavy_rain.mp3';
import LightningSound from '../../asset/sound/lightning.mp3';
import MountainSound from '../../asset/sound/mountain.mp3';
import RainSound from '../../asset/sound/rain.mp3';
import RiverSound from '../../asset/sound/river.mp3';
import WindBellSound from '../../asset/sound/wind_bell.mp3';
import WindSound from '../../asset/sound/wind.mp3';
import FrogSound from '../../asset/sound/frog_sound.mp3';
import NightSound from '../../asset/sound/night_woods.mp3';
import BobblesWatterCaveSound from '../../asset/sound/bubbles_watter_cave.mp3';


import { GiSoundWaves } from 'react-icons/gi';

const { Search } = Input;

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', image: null ,sound:''});

  const [isPlaying, setIsPlaying] = useState(null); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const soundParam = params.get('sound');
    const playingParam = params.get('playing');

    if (soundParam && playingParam === 'true') {
      const sound = getSoundObject(soundParam);
      if (sound) {
        setModalContent(sound);
        setIsModalVisible(true);
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(false);
    }
  }, [location.search]);
  
  useEffect(() => {
    const audioElement = document.getElementById('modalAudio');
    if (audioElement) {
      audioElement.load();
      audioElement.addEventListener('play', () => setIsPlaying(modalContent.sound));
      audioElement.addEventListener('pause', () => setIsPlaying(null));
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('play', () => setIsPlaying(modalContent.sound));
        audioElement.removeEventListener('pause', () => setIsPlaying(null));
      }
    };
  }, [modalContent.sound]);

  const getSoundObject = (soundParam) => {
    const soundObjects = {
      'Bird-Sound': { title: 'Bird Sound', image: Bird, sound: BirdSound },
      'Dripping-Water-Sound': { title: 'Dripping Water Sound', image: DrippingWatter, sound: DrippingWatterSound },
    };
    return soundObjects[soundParam];
  };

  const showModal = (title, image, sound) => {
    setModalContent({ title, image, sound });
    setIsModalVisible(true);
    // Update the URL when opening a sound modal
    const params = new URLSearchParams(location.search);
    params.set('sound', title.replace(/\s+/g, '-'));
    params.set('playing', 'true');
    navigate(`?${params}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // Update the URL when closing the sound modal only if the sound is paused
    if (!isPlaying) {
      const params = new URLSearchParams(location.search);
      params.delete('sound');
      params.set('playing', 'false');
      navigate(`?${params}`);
    }
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30}}>
        <Space direction="vertical">
          <Search
            className='search_sound'
            placeholder="Search sound ..."
            allowClear
            enterButton
            onSearch={onSearch}
            size="large"
            style={{
              width: 500,
            }}
          />
        </Space>
      </div>
      <div style={{ marginTop: 50 }}>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
          <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Bird Sound', Bird, BirdSound)}>
            <img src={Bird} className="item_video_sound" alt="Bird Image" />
            {isPlaying === BirdSound ? (
              <GiSoundWaves className="icon_sound playing" />
            ) : (
              <GiSoundWaves className="icon_sound" />
            )}
          <div className="overlay"></div>
        </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Dripping Water Sound', DrippingWatter, DrippingWatterSound)}>
              <img src={DrippingWatter} className="item_video_sound" alt="Dripping Water Image" />
              {isPlaying === DrippingWatterSound ? (
                <GiSoundWaves className="icon_sound playing" />
              ) : (
                <GiSoundWaves className="icon_sound" />
              )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Heaving Rain', HeavingRain,HeavingRainSound)}>
              <img src={HeavingRain} className="item_video_sound" alt="HeavingRainImage" />
                {isPlaying === HeavingRainSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Lightning', Lightning,LightningSound)}>
              <img src={Lightning} className="item_video_sound" alt="Lightning Image" />
                {isPlaying === LightningSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>

          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Mountain', Mountain,MountainSound)}>
              <img src={Mountain} className="item_video_sound" alt="Mountain Image" />
                {isPlaying === MountainSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Rain', Rain,RainSound)}>
              <img src={Rain} className="item_video_sound" alt="Rain Image" />
                {isPlaying === RainSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('River', River,RiverSound)}>
              <img src={River} className="item_video_sound" alt="River Image" />
                {isPlaying === RiverSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('WindBell', WindBell,WindBellSound)}>
              <img src={WindBell} className="item_video_sound" alt="WindBell Image" />
                {isPlaying === WindBellSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Wind', Wind,WindSound)}>
              <img src={Wind} className="item_video_sound" alt="WindSound Image" />
                {isPlaying === WindSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Night', Night,NightSound)}>
              <img src={Night} className="item_video_sound" alt="Night Image" />
                {isPlaying === NightSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Frog', Frog,FrogSound)}>
              <img src={Frog} className="item_video_sound" alt="Frog Image" />
                {isPlaying === FrogSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
          <Col className="gutter-row custom-col" lg={6} md={12} sm={12}>
            <div className={`video_sound ${isPlaying ? 'playing' : ''}`} onClick={() => showModal('Bobbles watter cave',Bobbles_watter_cave, BobblesWatterCaveSound)}>
              <img src={Bobbles_watter_cave} className="item_video_sound" alt=" Bobbles watter cave" />
                {isPlaying === BobblesWatterCaveSound ? (
                  <GiSoundWaves className="icon_sound playing" />
                ) : (
                  <GiSoundWaves className="icon_sound" />
                )}
              <div className="overlay"></div>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
       title={modalContent.title}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className='modalSound'
        onPlay={() => setIsPlaying(prev => ({ ...prev, [modalContent.sound]: true }))}
        onPause={() => setIsPlaying(prev => ({ ...prev, [modalContent.sound]: false }))}
      >
        <img src={modalContent.image} alt={modalContent.title} />
        <audio id="modalAudio" className="audio" controls loop>
          <source src={modalContent.sound} type="audio/mp3" />
        </audio>
      </Modal>
    </div>
  );
};

export default Home;
