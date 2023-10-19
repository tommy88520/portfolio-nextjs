function worksAnimation(gsap, imgsRef, containerref, uniImgRef) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: imgsRef[0],
        scrub: 1,
        start: 'top 100%',
        end: 'bottom -5%',
      },
    })
    .fromTo(
      imgsRef[0],
      {
        opacity: 0.5,
        scale: 0.8,
        y: 50,
        rotation: -40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        ease: 'power1.easeInOut',
      },
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: imgsRef[0],
        scrub: false,
        start: 'top 100%',
        end: 'bottom -10%',
        toggleActions: 'restart none none reverse',
      },
    })
    .fromTo(
      containerref[0],
      {
        y: 80,
      },
      {
        y: 0,
      },
    );
  // 第二區
  gsap
    .timeline({
      scrollTrigger: {
        trigger: uniImgRef,
        scrub: 1,
        start: 'top 50%',
        end: 'bottom 10%',
      },
    })
    .fromTo(
      uniImgRef,
      {
        opacity: 0.9,
        y: -80,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.easeInOut',
      },
    )
    .fromTo(
      imgsRef[1],
      {
        scale: 0.8,
        opacity: 0.9,
        x: -70,
        y: -120,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.easeInOut',
      },
      0,
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: containerref[1],
        scrub: false,
        start: 'top 100%',
        end: '60% 50%',
        toggleActions: 'restart none none reverse',
      },
    })
    .fromTo(
      containerref[1],
      {
        y: 80,
      },
      {
        y: 0,
      },
    );
  // //第三區
  gsap
    .timeline({
      scrollTrigger: {
        trigger: imgsRef[2],
        scrub: 1,
        start: 'top 80%',
        end: 'top 40%',
      },
    })
    .fromTo(
      imgsRef[2],
      {
        opacity: 0.7,
        x: -50,
        y: 0,
      },
      {
        opacity: 1,
        x: -50,
        y: -100,
        ease: 'power1.easeInOut',
      },
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: containerref[2],
        scrub: false,
        start: 'top 100%',
        end: '70% bottom',
        toggleActions: 'restart none none reverse',
      },
    })
    .fromTo(
      containerref[2],
      {
        y: 80,
      },
      {
        y: 0,
      },
    );
}

function navShrink(gsap, workContainer, ref) {
  if (workContainer) {
    const element = ref.current;
    if (!element) return;
    const navAnim = gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          scrub: true,
          start: 'top -300px',
          end: '35% 50%',
        },
      })
      .fromTo(
        workContainer.current,
        {
          scaleX: 0.9,
          transformOrigin: 'center center',
          ease: 'none',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        {
          scaleX: 1,
        },
      );

    return navAnim;
  }
}

function introItems(gsap, ref, extraIntroRef, introDetailsRef) {
  const element = ref.current;
  if (!element) return;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: extraIntroRef,
        start: 'top 100%',
        end: 'bottom 100px',
        scrub: false,
        toggleActions: 'restart none none reverse',
      },
    })
    .fromTo(
      introDetailsRef,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        ease: 'back',
      },
    );
}

export { worksAnimation, navShrink, introItems };
