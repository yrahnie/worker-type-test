function gtag_progress(label) {
  if (version != "LIVE") { return }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'test_progress',
    'testSlug': slug,
    'label': label,
  });
}

function gtag_adclick({ adAlias, referPage, adPk, adType, adHref }) {
  adPk = adPk || undefined
  if (version != "LIVE") { return }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'test_ad',
    'testSlug': slug,
    'adAlias': adAlias,
    'referPage': referPage,
    'adHref': adHref,
    'adType': adType,
    'adPk': adPk,
    'action': 'click'
  });
}

function gtag_share({ referPage, channel }) {
  if (version != "LIVE") { return }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'test_share',
    'testSlug': slug,
    'referPage': referPage,
    'shareChannel': channel,
    'action': 'click',
  });
}

function gtag_result(label, option_title) {
  option_title = option_title || undefined
  if (version != "LIVE") { return }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'test_result',
    'testSlug': slug,
    'label': label,
    'alias': option_title
  });
}

function gtag_answer(label, answer_alias, question_pk, question_alias) {
  answer_alias = answer_alias || undefined
  question_pk = question_pk || undefined
  question_alias = question_alias || undefined
  if (version != "LIVE") { return }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'test_answer',
    'testSlug': slug,
    'label': label,
    'answer_alias':answer_alias,
    'question_pk':question_pk,
    'question_alias':question_alias
  });
}

$(".ad_banner_zone").each(function () {
  let $this = $(this)
  let refer = $(this).attr('page')
  $.ajax({
    url: get_ad_banner_uri,
    method: 'POST',
    data: {
      csrfmiddlewaretoken: csrf_token,
      slug: slug,
      refer: refer
    },
    success: function (data) {
      if (data.banner) {
        $this.append(
          $("<a/>", {
            href: `${data.href}`,
            class: 'ad_banner',
            target: '_blank',
            page: `${data.refer}`,
            banner: `${data.pk}`,
            alias: `${data.alias}`,
            type: `${data.type}`
          }).append(
            $("<img/>", {
              src: `${data.banner}`
            })
          )
        )
      }
      else {
        $this.remove()
      }

    }
  })
})

function poomang_adclick(
  alias, refer, type, href, banner
) {
  banner = banner || undefined
  type = type || undefined
  if (version != "LIVE") { return }
  $.ajax({
    url: count_ad_click_uri,
    method: 'POST',
    data: {
      csrfmiddlewaretoken: csrf_token,
      slug: slug,
      refer: refer,
      alias: alias,
      type: type,
      href: href,
      banner: banner,
    }
  })
}

$(document).ready(function () {

  $(document).on('click', '.ad_href', function () {
    var alias = $(this).attr('alias')
    var refer = $(this).attr('page')
    var type = $(this).attr('type')
    var href = $(this).attr('href')

    gtag_adclick({
      adAlias: alias, referPage: refer, adType: type, adHref: href
    })
    poomang_adclick(
      alias, refer, type, href
    )
  })

  $(document).on('click', '.ad_banner', function () {
    var banner = $(this).attr('banner')
    var href = $(this).attr('href')
    var refer = $(this).attr('page')
    var type = $(this).attr('type')
    var alias = $(this).attr('alias')

    gtag_adclick({
      adAlias: alias, referPage: refer, adType: type, adHref: href, adPk: banner
    })
    poomang_adclick(
      alias, refer, type, href, banner
    )

  })

  $(document).on('click', '.share', function () {
    var channel = $(this).attr('channel')
    var share = $(this).attr('share')
    gtag_share({
      referPage: share,
      channel: channel
    })
  })

  $(document).on('click', '.next_question', function () {
    var aid = $(this).attr('aid')
    let answer_alias = $(this).attr('alias')
    let question_pk = $(this).closest('.question_inner').attr('qid')
    let question_alias = $(this).closest('.question_inner').attr('alias')
    gtag_answer(aid, answer_alias, question_pk, question_alias)
  })

  $(document).on('click', '#retry_button, .retry', function () {
    gtag_progress('test retry')
  })

  $("[href-from-detail='true']").each(function (){
    const current_url = new URL(document.location)
    const href_url = new URL($(this).attr('href'), current_url.origin)
    if (current_url.searchParams.get('from_detail')==='True') {
      href_url.searchParams.set('from_detail', 'True')
    }
    $(this).attr('href', href_url.href)
  })
})